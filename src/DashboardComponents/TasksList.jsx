import React from "react";

const TasksList = ({ tasks, onToggleTaskStatus }) => {
  return (
    <div>
      <ul className="NewHabitList">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <span>{task.name}</span>
            <input
              className="checkbox"
              type="checkbox"
              checked={task.status}
              onChange={() => onToggleTaskStatus(task.id, task.status)}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
