import React from 'react';

const TasksList = ({ tasks, onToggleTaskStatus }) => {
  return (
    <div>
      <h2>Today's To-Dos</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.status}
              onChange={() => onToggleTaskStatus(task.id, task.status)}
            />
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
