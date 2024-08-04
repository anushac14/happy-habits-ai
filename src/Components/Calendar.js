import React from 'react';

function Calendar({ habits, tasks }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  function calculateProgress(day) {
    const today = new Date().toISOString().split('T')[0];
    const dayTasks = tasks.filter(task => task.date === today && new Date(task.created_at).getDate() === day);
    const completedTasks = dayTasks.filter(task => task.status).length;
    return (completedTasks / habits.length) * 100; // Progress in percentage
  }

  return (
    <div>
      <h2>December, 2023</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {days.map(day => (
          <div key={day} style={{ border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
            {day}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '5px solid',
                borderColor: 'rgba(0, 150, 136, 0.3)',
                background: `conic-gradient(orange ${calculateProgress(day)}%, transparent 0%)`
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
