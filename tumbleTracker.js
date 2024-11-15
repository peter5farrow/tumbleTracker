const vaultSchedule = [];
const barsSchedule = [];
const beamSchedule = [];
const floorSchedule = [];

for (let i = 8; i <= 20; i += 0.25) {
  vaultSchedule.push(i);
  barsSchedule.push(i);
  beamSchedule.push(i);
  floorSchedule.push(i);
}

const fullSchedule = {
  vault: vaultSchedule,
  bars: barsSchedule,
  beam: beamSchedule,
  floor: floorSchedule,
};

const hotShots = { startTime: 0, duration: 2.5, stations: ["bars", "beam"] };
const level3 = {
  startTime: 0,
  duration: 2,
  stations: ["vault", "beam", "floor"],
};

const addClass = (className, time) => {
  for (const station of className.stations) {
    if (!fullSchedule[station].includes(time)) {
      return "Error";
    }
    fullSchedule[station].splice(
      fullSchedule[station].indexOf(time),
      className.duration * 4
    );
  }

  className.startTime = time;
  return className;
};

console.log(addClass(hotShots, 15));
console.log(addClass(level3, 10));
console.log(fullSchedule);
