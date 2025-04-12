import express from "express";
import cors from "cors";
import morgan from "morgan";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import { Level, Event, Day, Coach, LevelDay, db } from "./model.js";
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

const levelOrder = [
  "pre3A",
  "pre3B",
  "pre45A",
  "pre45B",
  "whiteRibA",
  "whiteRibB",
  "redRibA",
  "redRibB",
  "blueRibA",
  "blueRibB",
  "bronzeMedA",
  "bronzeMedB",
  "silvMedA",
  "silvMedB",
  "begBoys",
  "intBoys",
  "begTumb",
  "intTumb",
  "cheerTumb",
  "airAware",
  "hotShotFoun",
  "hotShotAdv",
  "hotTots",
  "xcelA",
  "xcelSilver",
  "xcelGold",
  "level3",
  "level4",
  "optionalA",
  "optionalB",
];

// Routes

// GET
app.get("/api/levels", async (req, res) => {
  try {
    const levels = await Level.findAll();
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/days", async (req, res) => {
  try {
    const days = await Day.findAll();
    res.json(days);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/coaches", async (req, res) => {
  try {
    const coaches = await Coach.findAll();
    res.json(coaches);
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

app.get("/api/day/:inputDay", async (req, res) => {
  try {
    const { inputDay } = req.params;
    const dayLevels = await LevelDay.findAll({
      where: { dayDayCode: inputDay },
    });

    const levelsList = [];
    for (const level of dayLevels) {
      const oneLevel = await Level.findOne({
        where: { levelCode: level.levelLevelCode },
      });
      levelsList.push(oneLevel);
    }

    levelsList.sort((a, b) => {
      return levelOrder.indexOf(a.levelCode) - levelOrder.indexOf(b.levelCode);
    });

    res.send(levelsList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/leveldays", async (req, res) => {
  try {
    const levelDays = await LevelDay.findAll();
    res.json(levelDays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT

// WORKING ON THIS ONE:
app.put("/api/update-levels", async (req, res) => {
  const { day, levels } = req.body;

  try {
    const thisDay = await Day.findOne({ where: { dayCode: day } });

    if (!thisDay) {
      return res.status(404).json({ message: "Day not found" });
    }

    const levelInstances = await Level.findAll({
      where: {
        levelCode: levels,
      },
    });

    await thisDay.setLevels(levelInstances);

    const updatedDay = await Day.findOne({
      where: { dayCode: day },
      include: Level,
    });

    res.status(200).json(updatedDay.levels);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//

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
