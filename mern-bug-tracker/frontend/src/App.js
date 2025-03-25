import BugForm from './components/BugForm';
import BugList from './components/BugList';

function App() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Bug Tracker</h1>
      <BugForm onBugCreated={(bug) => window.location.reload()} />
      <BugList />
    </div>
  );
}

export default App;
