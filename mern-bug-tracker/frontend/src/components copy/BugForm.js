import { useState } from 'react';
import { createBug } from '../api';

export default function BugForm({ onBugCreated }) {
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await createBug(form);
      onBugCreated(res.data); // Pass new bug back to parent
      setForm({ title: '', description: '' }); // Clear form
    } catch (err) {
      console.error(err);
      setError('Failed to create bug. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl mb-4 font-semibold">Report a Bug</h2>

      <input
        type="text"
        placeholder="Bug title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
        className="block w-full mb-3 p-2 border rounded"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
        rows="4"
        className="block w-full mb-3 p-2 border rounded"
      />

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
      >
        Report Bug
      </button>
    </form>
  );
}
