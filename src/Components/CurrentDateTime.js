import React from 'react';

function CurrentDateTime() {
  const currentDateTime = new Date().toLocaleString();

  return (
    <div>
      <h1>Happy {new Date().toLocaleDateString('en-US', { weekday: 'long' })} 👋</h1>
      <p>{currentDateTime}</p>
    </div>
  );
}

export default CurrentDateTime;
