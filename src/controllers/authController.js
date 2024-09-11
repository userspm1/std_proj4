const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');
const fs = require('fs');


// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register User
exports.register = async (req, res) => {

  try {
    const { username, email, contactNo, role, password } = req.body;
    // console.log(username, password, email, contactNo, role)
    const user = new User({ username, password, role, email, contactNo });
    await user.save();
    res.status(200).json({
      message: 'User registered successfully',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        contactNo: user.contactNo,
        role: user.role,
        address: user.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Debug: log the incoming credentials
    console.log("Login attempt with email:", email, "and password:", password);

    // Find user by email
    const user = await User.findOne({ email });

    // Debug: log the fetched user
    console.log("User found:", user);

    // Check if user exists and if the password is correct
    if (!user || !(await user.matchPassword(password))) {
      console.log("Invalid credentials, user not found or incorrect password");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Return success response with user details and token
    res.json({
      message: 'User logged in successfully',
      token,
      role: user.role,
      username: user.email,
      users: {
        _id: user._id,
        username: user.username,
        email: user.email,
        contactNo: user.contactNo,
        role: user.role,
        address: user.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    // Handle any errors
    console.log("Error during login:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = { ...req.body };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  try {
    res.json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addProducts = async (req, res) => {
  try {
    const { email } = req.params
    const { skuid } = req.body
    const user = await User.findOne({ email });
    // console.log(user)

    if (user) {
      user.addproducts.push(skuid)
      await user.save()
      return res.json({ message: 'product added' });
    }
    else {
      return res.status(400).json({ message: 'user not found' });

    }

  } catch (error) {
    console.log(error)
  }
}