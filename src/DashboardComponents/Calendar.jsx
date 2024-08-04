import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./calendar.css";

const Calendar = () => {
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [habits, setHabits] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchHabits();
      await fetchTasks();
    };

    fetchData();
  }, []);

  useEffect(() => {
    generateCalendarDays();
  }, [tasks, habits]);

  const fetchHabits = async () => {
    try {
      const { data, error } = await supabase.from("habits").select("*");
      if (error) throw error;
      setHabits(data);
    } catch (error) {
      console.error("Error fetching habits:", error.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) throw error;
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    setDaysInMonth(days);
  };

  const calculateProgress = (date) => {
    const dateString = date.toISOString().split("T")[0]; // 'YYYY-MM-DD'

    const dailyTasks = tasks.filter((task) => {
      const taskDate = new Date(task.date).toISOString().split("T")[0]; // 'YYYY-MM-DD'
      return taskDate === dateString;
    });

    const totalHabits = habits.length;
    const completedHabits = dailyTasks.filter((task) => task.status).length;

    return totalHabits === 0 ? 0 : (completedHabits / totalHabits) * 100;
  };

  return (
    <div className="calendar">
      {daysInMonth.map((day, index) => (
        <div key={index} className="calendar-day">
          <div className="day-number">{day.getDate()}</div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${calculateProgress(day)}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
