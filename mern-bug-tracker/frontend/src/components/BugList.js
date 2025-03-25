import { useState, useEffect } from 'react';
import { fetchBugs } from '../api';
import BugItem from './BugItem';

export default function BugList() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBugs();
  }, []);

  const loadBugs = async () => {
    try {
      const res = await fetchBugs();
      setBugs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBugCreated = (newBug) => {
    setBugs([newBug, ...bugs]);
  };

  const handleBugUpdated = (updatedBug) => {
    setBugs(bugs.map((b) => (b._id === updatedBug._id ? updatedBug : b)));
  };

  const handleBugDeleted = (id) => {
    setBugs(bugs.filter((b) => b._id !== id));
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl mb-4 font-semibold">Reported Bugs</h2>
      {loading ? (
        <p>Loading bugs...</p>
      ) : bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        bugs.map((bug) => (
          <BugItem
            key={bug._id}
            bug={bug}
            onBugUpdated={handleBugUpdated}
            onBugDeleted={handleBugDeleted}
          />
        ))
      )}
    </div>
  );
}
