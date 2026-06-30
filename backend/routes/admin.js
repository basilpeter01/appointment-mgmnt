import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token, authorization denied." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid." });
  }
};

// Admin route to create a doctor
router.post("/create-doctor", isAdmin, async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "Please enter all fields." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDoctor = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "doctor",
    });

    await newDoctor.save();

    res.status(201).json({ message: "Doctor account created successfully." });
  } catch (error) {
    console.error("Create Doctor Error:", error);
    res.status(500).json({ message: "Server error during doctor creation." });
  }
});

export default router;
