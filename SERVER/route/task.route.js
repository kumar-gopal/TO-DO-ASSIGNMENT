// Importing Express to create a router
const express = require("express");
const router = express.Router();
const authUser = require("../middleware/auth.middleware.js");

// Importing task-related controller functions
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require("../controller/task.controllers.js");

// Apply auth middleware to all routes in this router
router.use(authUser);

// Route to create a new task
// POST /tasks
// Body: { title: string, description: string }
// Example: { "title": "Read a book", "description": "Finish reading a novel" }
router.post("/", createTask);

// Route to fetch all tasks
// GET /tasks
// Returns an array of all tasks with details like title, description, status, and ID
router.get("/", getTasks);

// Route to fetch a task by its ID
// GET /tasks/:id
// Path Parameter: id (UUID of the task)
// Example: /tasks/123e4567-e89b-12d3-a456-426614174000
router.get("/:id", getTaskById);

// Route to update the status of a task
// PUT /tasks/:id
// Path Parameter: id (UUID of the task)
// Body: { status: string (one of "pending", "in-progress", "completed") }
// Example: { "status": "completed" }
router.put("/:id", updateTask);

// Route to delete a task by its ID
// DELETE /tasks/:id
// Path Parameter: id (UUID of the task)
// Example: /tasks/123e4567-e89b-12d3-a456-426614174000
router.delete("/:id", deleteTask);

// Exporting the router to be used in other parts of the application
module.exports = router;
