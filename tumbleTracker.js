const level3 = {};
const level4 = {};
const level5 = {};

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

  level3[realTime] = "";
  level4[realTime] = "";
  level5[realTime] = "";
}

const fullSchedule = { level3: level3, level4: level4, level5: level5 };

//

function addHour(level, station, time) {
  for (const eachLevel in fullSchedule) {
    if (fullSchedule[eachLevel][time] === station) {
      return "Error. Station in use at that time.";
    }
  }

  const startKey = time;
  const keys = Object.keys(fullSchedule[level]);
  const startIndex = keys.indexOf(startKey);

  for (let i = startIndex; i < startIndex + 4 && i < keys.length; i++) {
    const key = keys[i];
    fullSchedule[level][key] = station;
  }

  return fullSchedule;
}

console.log(addHour("level4", "beam", "3:15"));

console.log(addHour("level3", "beam", "4:00"));
