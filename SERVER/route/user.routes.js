// Import the Router method from the Express library
const router = require("express").Router();

// Import the controller functions for handling requests
const { registerUser ,loginUser } = require("../controller/user.controllers.js");

// Define a POST route for user registration
// Calls the registerUser function when the "/register" endpoint is hit
router.post("/register", registerUser);

// Define a POST route for user login
// Calls the loginUser function when the "/login" endpoint is hit
router.post("/login", loginUser);

// Export the router to be used in other parts of the application
module.exports = router;
