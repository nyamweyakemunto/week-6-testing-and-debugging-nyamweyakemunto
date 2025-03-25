import { useState } from "react";

const BugForm = ({ onSubmit, initialData }) => {
  const [bug, setBug] = useState(
    initialData || { title: "", description: "", status: "open" }
  );

  const handleChange = (e) => {
    setBug({ ...bug, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bug.title || !bug.description) {
      alert("Title and Description are required!");
      return;
    }
    onSubmit(bug);
    setBug({ title: "", description: "", status: "open" });
  };

  return (
    <form onSubmit={handleSubmit} className="bug-form">
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={bug.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={bug.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Status:</label>
        <select name="status" value={bug.status} onChange={handleChange}>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BugForm;
