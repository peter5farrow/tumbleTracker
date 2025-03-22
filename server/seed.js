import { Level, Event, Day, Coach, db } from "./model.js";
import levels from "./data/levels.json" assert { type: "json" };
import events from "./data/events.json" assert { type: "json" };
import days from "./data/days.json" assert { type: "json" };
import coaches from "./data/coaches.json" assert { type: "json" };
import times from "./data/times.json" assert { type: "json" };

console.log("Syncing database...");
await db.sync({ force: true });

console.log("Dropping tables...");
await Level.destroy({ where: {}, truncate: true });
await Event.destroy({ where: {}, truncate: true });
await Day.destroy({ where: {}, truncate: true });
await Coach.destroy({ where: {}, truncate: true });

console.log("Seeding database...");
const levelsInDB = await Level.bulkCreate(
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
    const { dayCode, dayName, levels } = day;

    return {
      dayCode,
      dayName,
      levels,
    };
  })
);

const coachesInDB = await Coach.bulkCreate(
  coaches.map((coach) => {
    const { coachName } = coach;

    return {
      coachName,
    };
  })
);

console.log(levelsInDB);
console.log(eventsInDB);
console.log(daysInDB);
console.log(coachesInDB);

await db.close();
console.log("Finished seeding database!");
