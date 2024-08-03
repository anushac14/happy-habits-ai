import React from 'react';

function TasksList({ tasks, onToggleTaskStatus }) {
  return (
    <div>
      <h2>Today's Todos</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.status}
                onChange={() => onToggleTaskStatus(task.id, task.status)}
              />
              {task.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksList;
