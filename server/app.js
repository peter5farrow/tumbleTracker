import express from "express";
import cors from "cors";
import morgan from "morgan";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { Level, Event, Day, Coach, Rotation, LevelDay, db } from "./model.js";
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

// Conflict detection helper function
async function isEquipmentAvailable(equipmentId, startTime, endTime) {
  const conflict = await TimeSlot.findOne({
    where: {
      equipmentId,
      [Sequelize.Op.and]: [
        { startTime: { [Sequelize.Op.lt]: endTime } },
        { endTime: { [Sequelize.Op.gt]: startTime } },
      ],
    },
  });

  return !conflict;
}

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

app.get("/api/rotations", async (req, res) => {
  try {
    const rotations = await Rotation.findAll();
    res.send(rotations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// /inputDay and inputCoach should return Rotations
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

app.get("/api/coach/:inputCoach", async (req, res) => {
  try {
    const { inputCoach } = req.params;
    res.json({ testing: "testing" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT

// In progress:
app.put("/api/update-coaches", async (req, res) => {
  const { level, coaches } = req.body;

  try {
    const thisLevel = await Level.findOne({ where: { levelCode: level } });

    if (!thisLevel) {
      return res.status(404).json({ message: "Level not found" });
    }

    const coachInstances = await Coach.findAll({
      where: {
        coachId: coaches,
      },
    });

    await thisLevel.setCoaches(coachInstances);

    const updatedLevel = await Level.findOne({
      where: { levelCode: level },
      include: Coach,
    });

    res.status(200).json(updatedLevel.coaches);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

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

app.put("/api/add-rotation", async (req, res) => {
  const { day, level, event, startTime, endTime } = req.body;

  try {
    const hasConflict = await Rotation.findOne({
      where: {
        eventCode: event,
        [Sequelize.Op.or]: [
          {
            startTime: {
              [Sequelize.Op.lt]: endTime,
            },
            endTime: {
              [Sequelize.Op.gt]: startTime,
            },
          },
        ],
      },
    });

    if (hasConflict) {
      throw new Error(
        "Time conflict: event is already booked during that slot."
      );
    } else {
      await Rotation.create({
        levelCode: level,
        eventCode: event,
        dayCode: day,
        startTime: startTime,
        endTime: endTime,
      });
    }

    res.status(201).json({ success: "New rotation created" });
  } catch (error) {
    console.error("Error updating:", error);
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
