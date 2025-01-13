import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <div className="bg-gray-100 p-4 mb-2 rounded">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.details}</p>
    </div>
  );
};

export default TaskItem;
