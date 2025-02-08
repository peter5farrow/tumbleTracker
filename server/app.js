import express from "express";
import cors from "cors";
import morgan from "morgan";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import { Level, Event, Day, Coach, db } from "./model.js";
import { times } from "./gtcData.js";

dotenv.config();

// Define app and port
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Configure ViteExpress for development
ViteExpress.config({ printViteDevServerHost: true });

// Routes

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

app.get("/api/times", async (req, res) => {
  try {
    res.send(times);
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

app.get("/api/day/:inputDay", async (req, res) => {
  try {
    const { inputDay } = req.params;
    const day = await Day.findOne({ dayCode: inputDay });
    res.json(day);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT
app.put("/api/add-levels", async (req, res) => {
  const { day, levels } = req.body;

  // figure out sorting later
  const levelsArr = [];
  for (const level of levels) {
    levelsArr.push(await Level.findOne({ levelCode: level }));
  }
  try {
    const thisDay = await Day.findOne({ dayCode: day });

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

app.put("/api/add-event", async (req, res) => {
  const { day, level, event, startTime, duration } = req.body;

  try {
    const thisDay = await Day.findOne({ dayCode: day });
    console.log(thisDay);

    const levelIndex = thisDay.levels.findIndex(
      (obj) => obj.levelCode === level
    );
    console.log(levelIndex);
    // let levelIndex = 1; // You can adjust this based on the actual logic to find the level index

    const timeKeys = Object.keys(thisDay["levels"][levelIndex]["times"]);
    const startIndex = timeKeys.indexOf(startTime);
    let hasConflict = false;

    for (const eachLevel of thisDay.levels) {
      for (
        let i = startIndex;
        i < startIndex + duration / 5 && i < timeKeys.length;
        i++
      ) {
        const key = timeKeys[i];
        if (eachLevel.times[key] === event) {
          hasConflict = true;
        }
      }
    }

    if (hasConflict) {
      return res
        .status(409)
        .json({ error: "Event conflict detected", day: thisDay });
    }

    for (
      let i = startIndex;
      i < startIndex + duration / 5 && i < timeKeys.length;
      i++
    ) {
      const key = timeKeys[i];
      thisDay.levels[levelIndex].times[key] = event;
    }

    // Mark the modified part as updated
    thisDay.markModified(`levels.${levelIndex}.times`);

    const updatedDay = await thisDay.save();

    res.status(201).json(updatedDay);
  } catch (error) {
    console.error("Error saving day:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//
if (process.env.NODE_ENV === "development") {
  ViteExpress.listen(app, port, () =>
    console.log(`Server is listening on http://localhost:${port}`)
  );
} else {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
