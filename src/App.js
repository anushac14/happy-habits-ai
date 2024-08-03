import React, { useState, useEffect } from 'react';
import {supabase} from './supabaseClient';
import HabitsList from './Components/HabitsList';
import TasksList from './Components/TasksList';
import Calendar from './Components/Calendar';
import CurrentDateTime from './Components/CurrentDateTime';
import './App.css';


function App() {
  const [habits, setHabits] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);

  useEffect(() => {
    fetchHabits();
    fetchTasks();
  }, []);

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

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase.from('tasks').select('*');
      if (error) {
        throw error;
      }
      setTasks(data);
      // Filter today's tasks
      const today = new Date().toDateString();
      setTodayTasks(data.filter(task => new Date(task.created_at).toDateString() === today));
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
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

        // Also add it to today's tasks
        const { data: taskData, error: taskError } = await supabase
          .from('tasks')
          .insert([{ name: habit.name, habit_id: habit.id, status: false }])
          .select();
        if (taskError) {
          throw taskError;
        }
        if (taskData && taskData.length > 0) {
          setTodayTasks([...todayTasks, taskData[0]]);
        }
      }
    } catch (error) {
      console.error('Error adding habit:', error.message);
    }
  };

  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ status: !currentStatus })
        .eq('id', taskId)
        .select();
      if (error) {
        throw error;
      }
      if (data && data.length > 0) {
        setTodayTasks(todayTasks.map(task => task.id === taskId ? data[0] : task));
      }
    } catch (error) {
      console.error('Error toggling task status:', error.message);
    }
  };

  return (
    <div>
      <CurrentDateTime />
      <Calendar habits={habits} tasks={tasks} />
      <HabitsList habits={habits} onAddHabit={addHabit} />
      <TasksList tasks={todayTasks} onToggleTaskStatus={toggleTaskStatus} />
    </div>
  );
}

export default App;
