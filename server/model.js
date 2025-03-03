import mongoose from "mongoose";
import connectToDB from "./db.js";
import dotenv from "dotenv";

dotenv.config();

export const db = connectToDB(process.env.MONGO_URI);

// Schema and Models
const DaySchema = new mongoose.Schema({
  dayCode: { type: String, required: true },
  dayName: String,
  levels: Array,
});

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

DaySchema.pre("save", function (next) {
  this.levels.sort((a, b) => {
    const indexA = levelOrder.indexOf(a.levelCode);
    const indexB = levelOrder.indexOf(b.levelCode);

    if (indexA === -1 || indexB === -1) return 0;
    return indexA - indexB;
  });
  next();
});
export const Day = mongoose.model("Day", DaySchema);

const LevelSchema = new mongoose.Schema({
  levelCode: { type: String, required: true },
  levelName: String,
  coaches: Array,
  times: Object,
});
export const Level = mongoose.model("Level", LevelSchema);

const EventSchema = new mongoose.Schema({
  eventCode: { type: String, required: true },
  eventName: String,
});
export const Event = mongoose.model("Event", EventSchema);

const CoachSchema = new mongoose.Schema({
  coachName: { type: String, required: true },
});
export const Coach = mongoose.model("Coach", CoachSchema);
