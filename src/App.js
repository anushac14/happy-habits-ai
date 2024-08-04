import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import HabitsList from './Components/HabitsList';
import TasksList from './Components/TasksList';
import Calendar from './Components/Calendar';
import CurrentDateTime from './Components/CurrentDateTime';
import './App.css';

function App() {
  const [habits, setHabits] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);

  useEffect(() => {
    fetchHabits();
    fetchTasks();
  }, []);

  // Fetch habits from the `habits` table
  const fetchHabits = async () => {
    try {
      const { data, error } = await supabase.from('habits').select('*');
      if (error) {
        throw error;
      }
      setHabits(data);
    } catch (error) {
      console.error('Error fetching habits:', error.message);
    }
  };

  // Fetch tasks from the `tasks` table for today
  const fetchTasks = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('date', today); // Fetch tasks for today
      if (error) {
        throw error;
      }
      setTodayTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  // Add a new habit to the `habits` table and initialize today's task
  const addHabit = async (name) => {
    try {
      const { data, error } = await supabase.from('habits').insert([{ name }]).select();
      if (error) {
        throw error;
      }
      if (data && data.length > 0) {
        const habit = data[0];
        setHabits([...habits, habit]);

        // Initialize the task for today
        const today = new Date().toISOString().split('T')[0];
        const { error: taskError } = await supabase
          .from('tasks')
          .insert([{ habit_id: habit.id, date: today, status: false }]);
        if (taskError) {
          throw taskError;
        }
        setTodayTasks([...todayTasks, { habit_id: habit.id, date: today, status: false }]);
      }
    } catch (error) {
      console.error('Error adding habit:', error.message);
    }
  };

  // Toggle the status of a task for today
  const toggleTaskStatus = async (habitId, currentStatus) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('tasks')
        .update({ status: !currentStatus })
        .eq('habit_id', habitId)
        .eq('date', today)
        .select();
      if (error) {
        throw error;
      }
      if (data && data.length > 0) {
        setTodayTasks(todayTasks.map(task =>
          task.habit_id === habitId ? { ...task, status: !currentStatus } : task
        ));
      }
    } catch (error) {
      console.error('Error toggling task status:', error.message);
    }
  };

  return (
    <div>
      <CurrentDateTime />
      <Calendar habits={habits} />
      <HabitsList habits={habits} onAddHabit={addHabit} />
      <TasksList tasks={todayTasks} onToggleTaskStatus={toggleTaskStatus} />
    </div>
  );
}

export default App;
