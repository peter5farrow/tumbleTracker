import { Level, Event, Day, Coach, db } from "./model.js";
import levels from "./data/levels.json" assert { type: "json" };
import events from "./data/events.json" assert { type: "json" };
import days from "./data/days.json" assert { type: "json" };
import coaches from "./data/coaches.json" assert { type: "json" };
import times from "./data/times.json" assert { type: "json" };
import mongoose from "mongoose";

console.log("Syncing database...");

// Drop the 'Level' collection to clear data
console.log("Dropping collections...");
await Level.deleteMany({});
await Event.deleteMany({});
await Day.deleteMany({});
await Coach.deleteMany({});

console.log("Seeding database...");

const levelsInDB = await Level.insertMany(
  levels.map((level) => {
    const { levelCode, levelName, coaches } = level;

    return {
      levelCode,
      levelName,
      coaches,
      times,
    };
  })
);

const eventsInDB = await Event.insertMany(
  events.map((event) => {
    const { eventCode, eventName } = event;

    return {
      eventCode,
      eventName,
    };
  })
);

const daysInDB = await Day.insertMany(
  days.map((day) => {
    const { dayCode, dayName, levels } = day;

    return {
      dayCode,
      dayName,
      levels,
    };
  })
);

const coachesInDB = await Coach.insertMany(
  coaches.map((coach) => {
    const { coachName } = coach;

    return {
      coachName,
    };
  })
);

//for confirmation
console.log(levelsInDB);
console.log(eventsInDB);
console.log(daysInDB);
console.log(coachesInDB);

await mongoose.disconnect();
console.log("Finished seeding database!");
