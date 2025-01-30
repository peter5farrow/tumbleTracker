import { Level, Event, Day, Time, Coach, db } from "./model.js";
import express from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
app.use(express.json()); // Parse incoming JSON requests

// Basic Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// GET
app.get("/days", async (req, res) => {
  try {
    const days = await Day.find();
    res.json(days);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/levels", async (req, res) => {
  try {
    const levels = await Level.find();
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/coaches", async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new day
app.post("/days", async (req, res) => {
  const { dayCode, dayName, levels } = req.body;
  const newDay = new Day({ dayCode, dayName, levels });

  try {
    const savedDay = await newDay.save();
    res.status(201).json(savedDay);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
