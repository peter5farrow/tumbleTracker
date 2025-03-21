import express from "express";
import cors from "cors";
import morgan from "morgan";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import { Level, Event, Day, Coach } from "./model.js";
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

app.get("/api/eventName/:inputEvent", async (req, res) => {
  try {
    const { inputEvent } = req.params;
    const event = await Event.findOne({ eventCode: inputEvent });
    res.send(event.eventName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT
app.put("/api/update-levels", async (req, res) => {
  const { day, levels } = req.body;

  const thisDay = await Day.findOne({ dayCode: day });
  const thisDayLevelCodes = thisDay.levels.map((lvl) => {
    return lvl.levelCode;
  });

  try {
    if (thisDay.levels.length === 0) {
      for (const level of levels) {
        thisDay.levels.push(await Level.findOne({ levelCode: level }));
      }
      let savedDay = await thisDay.save();
      res.status(201).json(savedDay);
      return;
    }

    for (const level of levels) {
      if (!thisDayLevelCodes.includes(level)) {
        thisDay.levels.push(await Level.findOne({ levelCode: level }));
      }
    }

    for (let i = thisDay.levels.length - 1; i >= 0; i--) {
      const level = thisDay.levels[i];
      if (!levels.includes(level.levelCode)) {
        thisDay.levels.splice(i, 1);
      }
    }

    let savedDay = await thisDay.save();
    res.status(201).json(savedDay);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/api/add-event", async (req, res) => {
  const { day, level, event, startTime, duration } = req.body;

  /*
//check for conflict
const timeslot = await Timeslot.findOne({})

  const newRotation = await Rotation.create({
  levelCode: level,
  eventCode: event,
  dayCode: day,
  timeslotId: ***,
  coachNames: ***
  })
  */

  try {
    const thisDay = await Day.findOne({ dayCode: day });
    const levelIndex = thisDay["levels"].findIndex(
      (obj) => obj["levelCode"] === level
    );

    const timeKeys = Object.keys(thisDay["levels"][levelIndex]["times"]);
    const startIndex = timeKeys.indexOf(startTime);
    const rotationTimes = [];
    for (
      let i = startIndex;
      i < startIndex + duration / 5 && i < timeKeys.length;
      i++
    ) {
      rotationTimes.push(timeKeys[i]);
    }

    let hasConflict = false;

    // *Deletes other events if reassigning a certain level. It does have the bug of deleting all other instances of events with conflicts. Check on this later.*
    const conflictedEvents = [];

    for (const key of rotationTimes) {
      if (
        thisDay["levels"][levelIndex]["times"][key] &&
        !conflictedEvents.includes(thisDay["levels"][levelIndex]["times"][key])
      ) {
        conflictedEvents.push(thisDay["levels"][levelIndex]["times"][key]);
      }
    }

    conflictedEvents.forEach((confEvt) => {
      for (const eachTime in thisDay["levels"][levelIndex]["times"]) {
        if (thisDay["levels"][levelIndex]["times"][eachTime] === confEvt) {
          thisDay["levels"][levelIndex]["times"][eachTime] = "";
        }
      }
    });

    for (const eachLevel of thisDay.levels) {
      for (const key of rotationTimes) {
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

    for (const key of rotationTimes) {
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
