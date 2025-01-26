import { Level, Event, Day, Timeslot, Coach, Rotation, db } from "./model.js";
import levels from "./data/levels.json" assert { type: "json" };
import events from "./data/events.json" assert { type: "json" };
import days from "./data/days.json" assert { type: "json" };
import coaches from "./data/coaches.json" assert { type: "json" };

console.log("Syncing database...");
await db.sync({ force: true });

console.log("Seeding database...");

const levelsInDB = await Promise.all(
  levels.map((level) => {
    const { levelCode, levelName } = level;

    const newLevel = Level.create({
      levelCode,
      levelName,
    });

    return newLevel;
  })
);

const eventsInDB = await Promise.all(
  events.map((event) => {
    const { eventCode, eventName } = event;

    const newEvent = Event.create({
      eventCode,
      eventName,
    });

    return newEvent;
  })
);

const daysInDB = await Promise.all(
  days.map((day) => {
    const { dayCode, dayName } = day;

    const newDay = Day.create({
      dayCode,
      dayName,
    });

    return newDay;
  })
);

const coachesInDB = await Promise.all(
  coaches.map((coach) => {
    const { coachName } = coach;

    const newCoach = Coach.create({
      coachName,
    });

    return newCoach;
  })
);

//for confirmation
console.log(levelsInDB);
console.log(eventsInDB);
console.log(daysInDB);
console.log(coachesInDB);

await db.close();
console.log("Finished seeding database!");
