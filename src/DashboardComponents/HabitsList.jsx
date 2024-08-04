import React, { useState } from "react";

function HabitsList({ habits, onAddHabit }) {
  const [newHabit, setNewHabit] = useState("");

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      onAddHabit(newHabit.trim());
      setNewHabit(""); // Clear the input field after adding the habit
    } else {
      console.error("Habit name cannot be empty");
    }
  };

  return (
    <div>
      <h2>Add Todays Habits</h2>
      <input
        type="text"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        placeholder="New Habit"
      />
      <button onClick={handleAddHabit}> Add New Habit</button>
    </div>
  );
}

export default HabitsList;
