import React from "react";
import BugItem from "./BugItem";

const BugList = ({ bugs, onUpdate, onDelete }) => {
  if (bugs.length === 0) {
    return <p className="empty-message">No bugs reported yet.</p>;
  }

  return (
    <div className="bug-list">
      {bugs.map((bug) => (
        <BugItem key={bug._id} bug={bug} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BugList;
