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
  }, []);

  useEffect(() => {
    fetchTasksForToday();
  }, [habits]); // Ensure tasks are fetched whenever habits change

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

  const fetchTasksForToday = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('date', today);
      if (error) {
        throw error;
      }
      const tasksForToday = habits.map(habit => {
        const task = data.find(t => t.habit_id === habit.id);
        return {
          ...habit,
          status: task ? task.status : false
        };
      });
      setTodayTasks(tasksForToday);
    } catch (error) {
      console.error('Error fetching tasks for today:', error.message);
    }
  };

  const addHabit = async (name) => {
    try {
      const { data, error } = await supabase.from('habits').insert([{ name }]).select();
      if (error) {
        throw error;
      }
      if (data && data.length > 0) {
        const habit = data[0];
        setHabits([...habits, habit]);
        setTodayTasks([...todayTasks, { ...habit, status: false }]);
      }
    } catch (error) {
      console.error('Error adding habit:', error.message);
    }
  };

  const toggleTaskStatus = async (habitId, currentStatus) => {
    try {
      const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
      const { data, error } = await supabase
        .from('tasks')
        .upsert([{ habit_id: habitId, date: today, status: !currentStatus }], 
          { onConflict: ['habit_id', 'date'] })
        .select();
      if (error) {
        throw error;
      }
      // Update the local state with the new status
      setTodayTasks(prevTasks =>
        prevTasks.map(task =>
          task.habit_id === habitId ? { ...task, status: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error('Error toggling task status:', error.message);
    }
  };
  

  return (
    <div>
      <CurrentDateTime />
      {/* <Calendar habits={habits} /> */}
      <HabitsList habits={habits} onAddHabit={addHabit} />
      <TasksList tasks={todayTasks} onToggleTaskStatus={toggleTaskStatus} />
    </div>
  );
}

export default App;
