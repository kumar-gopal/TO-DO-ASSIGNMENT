// Import express library to create the app
const express = require("express");
const mongoose = require("mongoose");

// Create an instance of the express app
const app = express();

// Load environment variables from a .env file into process.env
require("dotenv").config();
//Import dbconnection method
const Dbconnect = require("./config/index.js");

// Import the tasks route for CRUD operations
const tasksRoute = require("./route/task.route.js");
// Import the users route for register and login
const userRoutes = require("./route/user.routes.js");

// Use express's built-in JSON parser middleware
app.use(express.json());

// Define the route for handling tasks with the path "/api/v1/tasks"
app.use("/api/v1/tasks", tasksRoute);
// define the route for handling for users
app.use("/api/v1/users", userRoutes);

// Error handling middleware for 404 (route not found)
app.use((req, res, next) => {
    const error =  new Error("Route not found");
    error.status = 404;
    next(error); // Pass error to the next middleware
});


// Set the server port either from environment variables or default to 3001
const PORT = process.env.PORT || 3001;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    // Log a message when the server is successfully running
    console.log(`app is running on PORT ${PORT}`);
    Dbconnect();
});
