import mongoose from "mongoose";
import connectToDB from "./db.js";
import dotenv from "dotenv";

dotenv.config();

export const db = connectToDB(process.env.MONGO_URI);

// Example Schema and Model
const DaySchema = new mongoose.Schema({
  dayCode: { type: String, required: true },
  dayName: String,
  levels: Array,
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
