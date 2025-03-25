import { useState } from 'react';
import { updateBug, deleteBug } from '../api';

export default function BugItem({ bug, onBugUpdated, onBugDeleted }) {
  const [status, setStatus] = useState(bug.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    try {
      const res = await updateBug(bug._id, { status: newStatus });
      setStatus(res.data.status);
      onBugUpdated(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBug(bug._id);
      onBugDeleted(bug._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border p-4 rounded mb-3 flex justify-between items-start shadow-sm bg-gray-50">
      <div>
        <h3 className="font-semibold text-lg">{bug.title}</h3>
        <p className="mb-2 text-gray-700">{bug.description}</p>
        <div className="flex items-center space-x-2">
          <label>Status:</label>
          <select
            value={status}
            onChange={handleStatusChange}
            disabled={isUpdating}
            className="border rounded p-1"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
      >
        Delete
      </button>
    </div>
  );
}
