import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import { Level, Event, Day, Coach, db } from "./model.js";

dotenv.config();

// Define app and port
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configure ViteExpress for development
ViteExpress.config({ printViteDevServerHost: true });

// Functions
function addLevelsToDay(levels, day) {
  for (const level of levels) {
    fullSchedule[day][level] = {};

    for (let i = 2.5; i <= 8; i += 1 / 12) {
      const splitNum = i.toString(12).split(".");
      let realTime = splitNum[0];
      let fraction = splitNum[1];

      if (!fraction || (fraction && fraction[0] === "0")) {
        realTime += ":00";
      }
      if (fraction && fraction[0] === "1") {
        realTime += ":05";
      }
      if (fraction && fraction[0] === "2") {
        realTime += ":10";
      }
      if (fraction && fraction[0] === "3") {
        realTime += ":15";
      }
      if (fraction && fraction[0] === "4") {
        realTime += ":20";
      }
      if (fraction && fraction[0] === "5") {
        realTime += ":25";
      }
      if (fraction && fraction[0] === "6") {
        realTime += ":30";
      }
      if (fraction && fraction[0] === "7") {
        realTime += ":35";
      }
      if (fraction && fraction[0] === "8") {
        realTime += ":40";
      }
      if (fraction && fraction[0] === "9") {
        realTime += ":45";
      }
      if (fraction && fraction[0] === "a") {
        realTime += ":50";
      }
      if (fraction && fraction[0] === "b") {
        realTime += ":55";
      }

      fullSchedule[day][level][realTime] = "";
    }
  }
  return `Success! ${levels} added to ${day}.`;
}

function addEventToLevel(day, level, event, startTime, duration) {
  const keys = Object.keys(fullSchedule[day][level]);
  const startIndex = keys.indexOf(startTime);
  let hasConflict = false;

  for (const eachLevel in fullSchedule[day]) {
    for (
      let i = startIndex;
      i < startIndex + duration / 5 && i < keys.length;
      i++
    ) {
      const key = keys[i];
      if (fullSchedule[day][eachLevel][key] === event) {
        hasConflict = true;
      }
    }
  }

  if (hasConflict) {
    return { sched: fullSchedule[day], hasConflict: true };
  } else {
    for (
      let i = startIndex;
      i < startIndex + duration / 5 && i < keys.length;
      i++
    ) {
      const key = keys[i];
      fullSchedule[day][level][key] = event;
    }
  }
  return { sched: fullSchedule[day], hasConflict: false };
}

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

app.get("/api/coaches", async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT

//gpt version
app.put("/api/add-event", async (req, res) => {
  const { day, level, event, startTime, duration } = req.body;

  try {
    const thisDay = await Day.findOne({ dayCode: day });
    console.log(thisDay);

    let levelIndex = 1; // You can adjust this based on the actual logic to find the level index

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

    // Update the event times
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

    // Save the updated day object
    const updatedDay = await thisDay.save();

    res.status(201).json(updatedDay);
  } catch (error) {
    console.error("Error saving day:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.put("/api/add-event", async (req, res) => {
//   const { day, level, event, startTime, duration } = req.body;

//   const thisDay = await Day.findOne({ dayCode: day });
//   console.log(thisDay);
//   // const levelIndex = thisDay.levels.findIndex((obj) => {
//   //   obj.levelCode === level;
//   // });
//   let levelIndex = 1;

//   const timeKeys = Object.keys(thisDay["levels"][levelIndex]["times"]);
//   const startIndex = timeKeys.indexOf(startTime);
//   let hasConflict = false;

//   for (const eachLevel of thisDay.levels) {
//     for (
//       let i = startIndex;
//       i < startIndex + duration / 5 && i < timeKeys.length;
//       i++
//     ) {
//       const key = timeKeys[i];
//       if (eachLevel.times[key] === event) {
//         hasConflict = true;
//       }
//     }
//   }
//   if (hasConflict) {
//     res.status(409).json(thisDay);
//   } else {
//     for (
//       let i = startIndex;
//       i < startIndex + duration / 5 && i < timeKeys.length;
//       i++
//     ) {
//       const key = timeKeys[i];
//       thisDay.levels[levelIndex].times[key] = event;
//     }
//   }
//   const updatedDay = await thisDay.save();
//   res.status(201).json(updatedDay);
// });

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
