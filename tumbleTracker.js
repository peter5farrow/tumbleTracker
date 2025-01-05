const levelsList = [
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
  "silverMedA",
  "silverMedB",
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

const levelsInfo = {
  pre3A: { classesPerWeek: 0, eventsAndDurations: { vault: 0.5 } },
  pre3B: { classesPerWeek: 0, eventsAndDurations: { vault: 0.5 } },
  pre45A: { classesPerWeek: 0, eventsAndDurations: {} },
  pre45B: { classesPerWeek: 0, eventsAndDurations: {} },
  whiteRibA: { classesPerWeek: 0, eventsAndDurations: {} },
  whiteRibB: { classesPerWeek: 0, eventsAndDurations: {} },
  redRibA: { classesPerWeek: 0, eventsAndDurations: {} },
  redRibB: { classesPerWeek: 0, eventsAndDurations: {} },
  blueRibA: { classesPerWeek: 0, eventsAndDurations: {} },
  blueRibB: { classesPerWeek: 0, eventsAndDurations: {} },
  bronzeMedA: { classesPerWeek: 0, eventsAndDurations: {} },
  bronzeMedB: { classesPerWeek: 0, eventsAndDurations: {} },
  silverMedA: { classesPerWeek: 0, eventsAndDurations: {} },
  silverMedB: { classesPerWeek: 0, eventsAndDurations: {} },
  begBoys: { classesPerWeek: 0, eventsAndDurations: {} },
  intBoys: { classesPerWeek: 0, eventsAndDurations: {} },
  begTumb: { classesPerWeek: 0, eventsAndDurations: {} },
  intTumb: { classesPerWeek: 0, eventsAndDurations: {} },
  cheerTumb: { classesPerWeek: 0, eventsAndDurations: {} },
  airAware: { classesPerWeek: 0, eventsAndDurations: {} },
  hotShotFoun: { classesPerWeek: 0, eventsAndDurations: {} },
  hotShotAdv: { classesPerWeek: 0, eventsAndDurations: {} },
  hotTots: { classesPerWeek: 0, eventsAndDurations: {} },
  xcelA: { classesPerWeek: 0, eventsAndDurations: {} },
  xcelSilver: { classesPerWeek: 0, eventsAndDurations: {} },
  xcelGold: { classesPerWeek: 0, eventsAndDurations: {} },
  level3: { classesPerWeek: 0, eventsAndDurations: {} },
  level4: { classesPerWeek: 0, eventsAndDurations: {} },
  optionalA: { classesPerWeek: 0, eventsAndDurations: {} },
  optionalB: { classesPerWeek: 0, eventsAndDurations: {} },
};

// for (const level of levelsList) {
//   levelReference[level] = {
//     classesPerWeek: 0,
//     eventsAndDurations: {},
//   };
// }

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

    for (let i = 2.5; i < 8; i += 0.25) {
      let splitNum = i.toString().split(".");
      let realTime = splitNum[0];

      if (!splitNum[1]) {
        realTime += ":00";
      }
      if (splitNum[1] === "25") {
        realTime += ":15";
      }
      if (splitNum[1] === "5") {
        realTime += ":30";
      }
      if (splitNum[1] === "75") {
        realTime += ":45";
      }

      fullSchedule[day][level][realTime] = "";
    }
  }
  return fullSchedule[day];
}

// function addHour(level, station, time) {
//   for (const eachLevel in fullSchedule) {
//     if (fullSchedule[eachLevel][time] === station) {
//       return "Error. Station in use at that time.";
//     }
//   }

//   const startKey = time;
//   const keys = Object.keys(fullSchedule[level]);
//   const startIndex = keys.indexOf(startKey);

//   for (let i = startIndex; i < startIndex + 4 && i < keys.length; i++) {
//     const key = keys[i];

//     fullSchedule[level][key] = station;
//   }

//   return fullSchedule;
// }

function addEvent(day, level, event, startTime) {
  const duration = levelsInfo[level].eventsAndDurations[event];

  for (const eachLevel in fullSchedule[day]) {
    if (fullSchedule[day][eachLevel][startTime] === event) {
      return "Error. Station in use at that time.";
    }
  }

  const keys = Object.keys(fullSchedule[day][level]);
  const startIndex = keys.indexOf(startTime);

  for (
    let i = startIndex;
    i < startIndex + duration * 4 && i < keys.length;
    i++
  ) {
    const key = keys[i];

    fullSchedule[day][level][key] = event;
  }

  return fullSchedule[day];
}

//

const subset = [];
for (let i = 0; i < 4; i++) {
  subset.push(levelsList[i]);
}

addLevelsToDay(subset, "mondayB");

console.log(addEvent("mondayB", "pre3A", "vault", "5:30"));
console.log(addEvent("mondayB", "pre3B", "vault", "5:15"));
