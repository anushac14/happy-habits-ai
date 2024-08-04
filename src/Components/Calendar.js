import React from 'react';

function Calendar({ habits, tasks }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  const calculateProgress = (tasks, day) => {
    if (!tasks) return 0; 
    const totalTasks = tasks.filter(task => task.created_at === day).length;
    const completedTasks = tasks.filter(task => task.status && task.created_at === day).length;
    return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  };
  

  return (
    <div>
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
