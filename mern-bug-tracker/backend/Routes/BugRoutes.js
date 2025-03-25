const express = require('express');
const router = express.Router();
const Bug = require('.. /models/Bug');

// POST - Create a new bug
router.post('/', async (req, res) => {
  try {
    const newBug = new Bug(req.body);
    const savedBug = await newBug.save();
    res.status(201).json(savedBug);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Get all bugs
router.get('/', async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.status(200).json(bugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update bug status or details
router.put('/:id', async (req, res) => {
  try {
    const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBug);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Delete a bug
router.delete('/:id', async (req, res) => {
  try {
    await Bug.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Bug deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
