import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import TopBar from "../Components/TopBar";
import HabitsList from "../DashboardComponents/HabitsList";
import TasksList from "../DashboardComponents/TasksList";
import Calendar from "../DashboardComponents/Calendar";
import CurrentDateTime from "../DashboardComponents/CurrentDateTime";
import "../pages/Dashboard.css";
import Video from "../assets/WhatsApp Video 2024-08-04 at 6.01.21 PM-vmake.mp4";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchHabits();
  }, []);

  useEffect(() => {
    fetchTasksForToday();
  }, [habits]);

  const fetchHabits = async () => {
    try {
      const { data, error } = await supabase.from("habits").select("*");
      if (error) throw error;
      setHabits(data);
    } catch (error) {
      console.error("Error fetching habits:", error.message);
    }
  };

  const fetchTasksForToday = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("date", today);
      if (error) throw error;
      const tasksForToday = habits.map((habit) => {
        const task = data.find((t) => t.habit_id === habit.id);
        return {
          ...habit,
          status: task ? task.status : false,
        };
      });
      setTodayTasks(tasksForToday);
    } catch (error) {
      console.error("Error fetching tasks for today:", error.message);
    }
  };

  const addHabit = async (name) => {
    try {
      const { data, error } = await supabase
        .from("habits")
        .insert([{ name }])
        .select();
      if (error) throw error;
      if (data && data.length > 0) {
        const habit = data[0];
        setHabits((prevHabits) => [...prevHabits, habit]);
        setTodayTasks((prevTasks) => [
          ...prevTasks,
          { ...habit, status: false },
        ]);
      }
    } catch (error) {
      console.error("Error adding habit:", error.message);
    }
  };

  const toggleTaskStatus = async (habitId, currentStatus) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("tasks")
        .upsert([{ habit_id: habitId, date: today, status: !currentStatus }], {
          onConflict: ["habit_id", "date"],
        })
        .select();
      if (error) throw error;
      setTodayTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === habitId ? { ...task, status: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task status:", error.message);
    }
  };

  const formatMonthYear = (month, year) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[month]} ${year}`;
  };

  return (
    <div className="container-body">
      <TopBar name="Dashboard" />
      <div className="pageContainer">
        <div className="flex-container">
          <div className="dashboardLeft">
            <CurrentDateTime />
            {/* {"....."} */}
            <div className="calendarContainer">
              <div className="calendar-header">
                <h2>{formatMonthYear(currentMonth, currentYear)}</h2>
              </div>
              <Calendar habits={habits} />
            </div>
            <video className="video-player" width="350" autoPlay loop muted>
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* {"....."} */}
          <div className="Habits">
            <HabitsList habits={habits} onAddHabit={addHabit} />
            <TasksList
              tasks={todayTasks}
              onToggleTaskStatus={toggleTaskStatus}
            />
          </div>
        </div>
        {/* {"....."} */}
      </div>
    </div>
  );
}

export default Dashboard;
