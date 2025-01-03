// Importing the Task model for database operations
const Task = require("../models/task.models");  // Import the Task model

/**
 * GET /tasks
 * Fetches all tasks from the database
 */
const getTasks = async (req, res) => {
    try {
        // Assuming req.userId directly contains the userId
        const userId = req.userId;

        // Fetch tasks for the specific user
        const tasks = await Task.find({ userId });

        return res.status(200).json({
            message: "Tasks fetched successfully",
            success: true,
            tasks,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};


/**
 * GET /tasks/:id
 * Fetches a specific task by its ID
 */
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id); // Find task by its MongoDB _id

        if (!task) {
            return res.status(404).json({
                message: "Task not found!",
                success: false,
            });
        }

        return res.status(200).json({
            message: `Task fetched successfully with ID: ${id}`,
            success: true,
            task, // Return the fetched task
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

/**
 * POST /tasks
 * Creates a new task with the provided title and description
 */
const createTask = async (req, res) => {
    try {
        const { title, description, userId } = req.body;

        if (!title || !description || !description) {
            return res.status(400).json({
                message: "Title and description are required and must be strings!",
                success: false,
            });
        }

        const newTask = new Task({
            title,
            description,
            userId : req.userId
        });

        await newTask.save(); // Save the new task to MongoDB

        return res.status(201).json({
            message: "Task created successfully!",
            success: true,
            task: newTask, // Return the created task
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to create task",
            success: false,
        });
    }
};

/**
 * PUT /tasks/:id
 * Updates the status of an existing task
 */
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["pending", "in-progress", "completed"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status value!",
            });
        }

        const task = await Task.findById(id); // Find the task by its MongoDB _id

        if (!task) {
            return res.status(404).json({
                message: "Task not found!",
            });
        }

        task.status = status; // Update task status
        await task.save(); // Save the updated task to MongoDB

        return res.status(200).json({
            message: "Task updated successfully!",
            success: true,
            task, // Return the updated task
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

/**
 * DELETE /tasks/:id
 * Deletes a specific task by its ID
 */
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id); // Find and delete task by its MongoDB _id

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found!",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Exporting all task-related controller functions
 */
module.exports = {
    getTasks,
    createTask,
    updateTask,
    getTaskById,
    deleteTask,
};
