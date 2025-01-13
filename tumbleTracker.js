import { levelsList, levelsInfo } from "./levels";

const fullSchedule = {
  mondayA: {},
  mondayB: {},
  tuesdayA: {},
  tuesdayB: {},
  wednesdayA: {},
  wednesdayB: {},
  thursdayA: {},
  thursdayB: {},
  friday: {},
};

//

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
  return fullSchedule[day];
}

function addEvent(day, level, event, startTime) {
  const duration = levelsInfo[level].eventsAndDurations[event];
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
  return `Success! ${level} ${event} added to ${day}.`;
}

//

const subset = [];
for (let i = 0; i < 2; i++) {
  subset.push(levelsList[i]);
}
addLevelsToDay(subset, "mondayB");

console.log(addEvent("mondayB", "pre3A", "vault", "5:30"));
console.log(addEvent("mondayB", "pre3B", "bars", "5:20"));
console.log(addEvent("mondayB", "pre3A", "floor", "3:00"));
console.log(addEvent("mondayB", "pre3B", "floor", "2:55"));

console.log(fullSchedule["mondayB"]);
