const Bug = require("../models/bugModel");
const asyncHandler = require("express-async-handler");

// @desc    Get all bugs
// @route   GET /api/bugs
// @access  Public
const getBugs = asyncHandler(async (req, res) => {
    const bugs = await Bug.find();
    res.status(200).json(bugs);
});

// @desc    Get a single bug by ID
// @route   GET /api/bugs/:id
// @access  Public
const getBugById = asyncHandler(async (req, res) => {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
        res.status(404);
        throw new Error("Bug not found");
    }
    res.status(200).json(bug);
});

// @desc    Create a new bug
// @route   POST /api/bugs
// @access  Public
const createBug = asyncHandler(async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error("Title and description are required");
    }

    const bug = await Bug.create({
        title,
        description,
        status: status || "open",
    });

    res.status(201).json(bug);
});

// @desc    Update a bug
// @route   PUT /api/bugs/:id
// @access  Public
const updateBug = asyncHandler(async (req, res) => {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
        res.status(404);
        throw new Error("Bug not found");
    }

    const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json(updatedBug);
});

// @desc    Delete a bug
// @route   DELETE /api/bugs/:id
// @access  Public
const deleteBug = asyncHandler(async (req, res) => {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
        res.status(404);
        throw new Error("Bug not found");
    }

    await bug.deleteOne();

    res.status(200).json({ message: "Bug removed" });
});

module.exports = {
    getBugs,
    getBugById,
    createBug,
    updateBug,
    deleteBug,
};
