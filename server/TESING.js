import { Level, Event, Day, Coach, db } from "./model.js";
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
app.get("/api/days", async (req, res) => {
  try {
    const days = await Day.find();
    res.json(days);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/levels", async (req, res) => {
  try {
    const levels = await Level.find();
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/coaches", async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new day
// app.post("/api/days", async (req, res) => {
//   const { dayCode, dayName, levels } = req.body;
//   const newDay = new Day({ dayCode, dayName, levels });

//   try {
//     const savedDay = await newDay.save();
//     res.status(201).json(savedDay);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// PUT
app.put("/api/add-event", async (req, res) => {
  const { day, level, event, startTime, duration } = req.body;

  const thisDay = Day.find({ dayCode: day });

  const timeKeys = Object.keys(thisDay[level]["times"]);
  const startIndex = timeKeys.indexOf(startTime);
  let hasConflict = false;

  for (const eachLevel in thisDay) {
    for (
      let i = startIndex;
      i < startIndex + duration / 5 && i < timeKeys.length;
      i++
    ) {
      const key = timeKeys[i];
      if (day[eachLevel][key] === event) {
        hasConflict = true;
      }
    }
  }
  if (hasConflict) {
    res.status(409).json(thisDay);
  } else {
    for (
      let i = startIndex;
      i < startIndex + duration / 5 && i < timeKeys.length;
      i++
    ) {
      const key = timeKeys[i];
      day[level][key] = event;
    }
  }
  const updatedDay = await thisDay.save();
  res.status(201).json(updatedDay);
});

app.put("/api/add-levels", async (req, res) => {
  const { day, levels } = req.body;

  const levelsArr = [];
  for (const level of levels) {
    levelsArr.push(await Level.find({ levelCode: level }));
  }
  console.log(levelsArr);
  try {
    const thisDay = await Day.findOne({ dayCode: day });
    console.log(thisDay);

    if (!thisDay.levels) {
      thisDay.levels = levelsArr;
      const savedDay = await thisDay.save();
      res.status(201).json(savedDay);
    } else {
      const thisDayLevels = [...thisDay.levels];
      const allLevels = thisDayLevels.concat(levelsArr);
      thisDay.levels = allLevels;
      const savedDay = await thisDay.save();

      res.status(201).json(savedDay);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
