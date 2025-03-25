const express = require("express");
const {
    getBugs,
    getBugById,
    createBug,
    updateBug,
    deleteBug,
} = require("../controllers/bugController");

const router = express.Router();

// Define routes
router.route("/")
    .get(getBugs)    // GET all bugs
    .post(createBug); // POST a new bug

router.route("/:id")
    .get(getBugById)  // GET a single bug by ID
    .put(updateBug)   // UPDATE a bug by ID
    .delete(deleteBug); // DELETE a bug by ID

module.exports = router;
