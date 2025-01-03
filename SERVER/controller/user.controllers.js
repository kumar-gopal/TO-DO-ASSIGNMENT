const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const { generateSalt,hashPassword, isMatch } = require("../utility/password.utility");

// Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are mandatory!",
        success: false,
      });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists!",
        success: false,
      });
    }

    // Hash the password
    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password,salt)

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User successfully registered!",
      success: true,
      user : newUser
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server Error",
      success: false,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are mandatory!",
        success: false,
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials!",
        success: false,
      });
    }

    // Compare passwords
    const isCorrectPassword = await isMatch(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials!",
        success: false,
      });
    }

    // Create a JWT
    const payload = {
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "User successfully logged in!",
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server Error",
      success: false,
    });
  }
};

module.exports = { registerUser, loginUser };
