import React from "react";

const BugItem = ({ bug, onUpdate, onDelete }) => {
  return (
    <div className="bug-item">
      <h3>{bug.title}</h3>
      <p>{bug.description}</p>
      <p>
        <strong>Status:</strong> <span className={`status ${bug.status}`}>{bug.status}</span>
      </p>

      <div className="actions">
        <button onClick={() => onUpdate(bug)}>Edit</button>
        <button onClick={() => onDelete(bug._id)} className="delete">Delete</button>
      </div>
    </div>
  );
};

export default BugItem;
