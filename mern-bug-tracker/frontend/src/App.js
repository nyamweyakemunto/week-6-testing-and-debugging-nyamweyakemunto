import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BugForm from "./components/BugForm";
import BugList from "./components/BugList";
import { getBugs } from "./api/api";
import "./App.css";

const App = () => {
  const [bugs, setBugs] = useState([]);

  // Fetch bugs from API
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const data = await getBugs();
        setBugs(data);
      } catch (error) {
        console.error("Error fetching bugs:", error);
      }
    };
    fetchBugs();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <h1>🐞 Bug Tracker</h1>
        <Routes>
          <Route path="/" element={<BugList bugs={bugs} />} />
          <Route path="/report" element={<BugForm setBugs={setBugs} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
