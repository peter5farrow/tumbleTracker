import {
  levelsList,
  levelsInfo,
  times,
  events,
  fullSchedule,
} from "./gtcData.js";
import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

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
    return `Error. ${event} in use at selected time.`;
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
  return `Success! ${event} added to ${level}.`;
}

// Testing

const subset = [];
for (let i = 0; i < levelsList.length / 2; i++) {
  subset.push(levelsList[i]);
}
// addLevelsToDay(subset, "mondayA");

// addEvent("mondayA", "pre3A", "vault", "5:30");
// addEvent("mondayA", "redRibA", "floor", "2:35");
// addEvent("mondayA", "bronzeMedA", "beam", "2:45");
// addEvent("mondayA", "silverMedA", "bars", "4:30");
// addEvent("mondayA", "pre3B", "vault", "5:25");

// Routes
app.get("/api/days", (req, res) => {
  res.send(Object.keys(fullSchedule));
});

app.get("/api/levels", (req, res) => {
  res.send(levelsList);
});

app.get("/api/times", (req, res) => {
  res.send(times);
});

app.get("/api/events", (req, res) => {
  res.send(events);
});

app.get("/api/day:day", (req, res) => {
  const { day } = req.params;
  res.json(fullSchedule[day]);
});

//

app.put("/api/add-levels", (req, res) => {
  const { levels, day } = req.body;
  res.send(addLevelsToDay(levels, day));
  res.json({ isAdded: true });
});

app.put("/api/add-event", (req, res) => {
  const { day, level, event, startTime, duration } = req.body;
  addEventToLevel(day, level, event, startTime, duration);
  res.json({ isAdded: true });
});

//

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
