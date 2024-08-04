import React from 'react';

const Calendar = ({ habits, tasks = [] }) => {
  // Ensure tasks is always an array
  const calculateProgress = (tasks, day) => {
    if (!Array.isArray(tasks)) return 0; // Ensure tasks is an array
    const totalTasks = tasks.filter(task => task.date === day).length;
    const completedTasks = tasks.filter(task => task.status && task.date === day).length;
    return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  };

  // Render the component
  return (
    <div>
      {/* Calendar rendering logic */}
    </div>
  );
};

export default Calendar;
