import { Level, Event, Day, Coach, db } from "./model.js";
import levels from "./data/levels.json" assert { type: "json" };
import events from "./data/events.json" assert { type: "json" };
import days from "./data/days.json" assert { type: "json" };
import coaches from "./data/coaches.json" assert { type: "json" };

console.log("Syncing database...");
await db.sync({ force: true });

console.log("Seeding database...");
const levelsInDB = await Level.bulkCreate(
  levels.map((level) => {
    const { levelCode, levelName, days, coaches } = level;

    return {
      levelCode,
      levelName,
      days,
      coaches,
    };
  })
);

const eventsInDB = await Event.bulkCreate(
  events.map((event) => {
    const { eventCode, eventName } = event;

    return {
      eventCode,
      eventName,
    };
  })
);

const daysInDB = await Day.bulkCreate(
  days.map((day) => {
    const { dayCode, dayName, levels, coaches } = day;

    return {
      dayCode,
      dayName,
      levels,
      coaches,
    };
  })
);

const coachesInDB = await Coach.bulkCreate(
  coaches.map((coach) => {
    const { coachName, levels, days } = coach;

    return {
      coachName,
      levels,
      days,
    };
  })
);

console.log(levelsInDB);
console.log(eventsInDB);
console.log(daysInDB);
console.log(coachesInDB);

await db.close();
console.log("Finished seeding database!");
