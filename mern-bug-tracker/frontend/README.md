Project Suggestion: Bug Tracker Application

Users can:

Report new bugs by filling out a form.

View a list of all reported bugs.

Update bug statuses (e.g., open, in-progress, resolved).

Delete bugs.

1. Project Setup
Step 1: Create Project Folder
mkdir mern-bug-tracker && cd mern-bug-tracker
Step 2: Initialize Backend

Create a backend folder:

mkdir backend && cd backend
npm init -y
npm install express mongoose dotenv jest supertest

Set up a testing script in package.json:

"scripts": {
    "start": "node server.js",
    "test": "jest"
}
Step 3: Initialize Frontend

Create a frontend folder:

cd ../
mkdir frontend && cd frontend
npx create-react-app .
npm install axios react-router-dom @testing-library/react @testing-library/jest-dom
2. Backend Development
Step 1: Set Up Express Server

Create backend/server.js:

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

Add a .env file:

MONGO_URI=your_mongodb_connection_string
PORT=5000
Step 2: Create Bug Model

Create backend/models/Bug.js:

const mongoose = require('mongoose');

const BugSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'open', enum: ['open', 'in-progress', 'resolved'] },
});

module.exports = mongoose.model('Bug', BugSchema);
Step 3: Create API Routes

Create backend/routes/bugRoutes.js:

const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');

// Create a new bug
router.post('/', async (req, res) => {
    try {
        const bug = await Bug.create(req.body);
        res.status(201).json(bug);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all bugs
router.get('/', async (req, res) => {
    try {
        const bugs = await Bug.find();
        res.status(200).json(bugs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

Add the routes to server.js:

const bugRoutes = require('./routes/bugRoutes');
app.use('/api/bugs', bugRoutes);
Step 4: Implement Error Handling Middleware

Add error handling middleware to server.js:

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message });
});
3. Frontend Development
Step 1: Create React Components

1. BugList Component: frontend/src/components/BugList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BugList() {
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        axios.get('/api/bugs')
            .then(res => setBugs(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Bug Tracker</h1>
            <ul>
                {bugs.map(bug => (
                    <li key={bug._id}>{bug.title} - {bug.status}</li>
                ))}
            </ul>
        </div>
    );
}

export default BugList;

2. BugForm Component: frontend/src/components/BugForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

function BugForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/bugs', { title, description })
            .then(() => {
                setTitle('');
                setDescription('');
            })
            .catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <button type="submit">Report Bug</button>
        </form>
    );
}

export default BugForm;
4. Testing
Step 1: Backend Testing

1. Write Unit Tests:

Create backend/tests/unit.test.js:

const validateBug = (title) => title.length > 0;

test('Bug title should be valid', () => {
    expect(validateBug('Sample Bug')).toBe(true);
    expect(validateBug('')).toBe(false);
});

2. Write Integration Tests:

Create backend/tests/integration.test.js:

const request = require('supertest');
const app = require('../server');

test('GET /api/bugs', async () => {
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
});
Step 2: Frontend Testing

1. Write Component Tests:

Create frontend/src/components/BugList.test.jsx:

import { render, screen } from '@testing-library/react';
import BugList from './BugList';

test('renders bug list', () => {
    render(<BugList />);
    const heading = screen.getByText(/Bug Tracker/i);
    expect(heading).toBeInTheDocument();
});
5. Debugging

Use console.log to trace variables and execution flow.

Use Chrome DevTools to inspect network requests and application state.

Use Node.js Inspector for server-side debugging:

node --inspect server.js
6. Deployment
Step 1: Deploy Backend

Use Render or Heroku.

Add environment variables (e.g., MONGO_URI).

Step 2: Deploy Frontend

Use Vercel or Netlify.

Set the API base URL to point to the deployed backend.

7. Documentation

Create a README.md file including:

Project Overview: Describe the bug tracker application.

Setup Instructions: How to run the backend and frontend.

Testing Approach: Explain unit and integration testing.

Debugging Techniques: List the tools and steps used.

8. Submission

Push your project to GitHub


Evaluation Criteria

Testing:

Comprehensive unit and integration tests.

Proper test coverage and documentation.

Debugging:

Effective use of debugging tools and techniques.

Error Handling:

Well-implemented error handling for both backend and frontend.

Deployment:

Successfully deployed live application.

Documentation:

Clear and detailed README.md.
