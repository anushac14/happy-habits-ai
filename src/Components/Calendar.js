import React from 'react';

function Calendar({ habits, tasks }) {
  // Dummy data for demonstration. You'll need to implement proper logic.
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div>
      <h2>December, 2023</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {days.map(day => (
          <div key={day} style={{ border: '1px solid #ccc', padding: '10px' }}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
