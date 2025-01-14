import { levelsList, levelsInfo, times } from "../../server/levels";
import { fullSchedule, addLevelsToDay, addEvent } from "../../server/server";

export default function Calendar() {
  // Headers
  const levelHeaders = levelsList.map((level) => {
    if (levelsList.indexOf(level) < levelsList.length / 2) {
      return <th key={level}>{level}</th>;
    }
  });

  // Testing
  const subset = [];
  for (let i = 0; i < levelsList.length / 2; i++) {
    subset.push(levelsList[i]);
  }
  addLevelsToDay(subset, "mondayA");
  console.log(addEvent("mondayA", "pre3A", "vault", "5:30"));
  console.log(addEvent("mondayA", "whiteRibA", "floor", "3:55"));
  console.log(addEvent("mondayA", "bronzeMedA", "beam", "2:45"));
  console.log(addEvent("mondayA", "silverMedA", "bars", "4:30"));
  console.log(addEvent("mondayA", "pre3B", "vault", "5:25"));
  // BUG ALERT! If the same group changes events at a certain time, remove all of the previous event, not just the overlapping slots.

  // Generating cells
  // TO DO! Add forEach day functionality
  const rows = [];
  for (const time in times) {
    const cells = [];

    for (const level in fullSchedule.mondayA) {
      if (fullSchedule.mondayA[level][time] === "vault") {
        cells.push(
          <td key={`${time}${level}`} style={{ backgroundColor: "lightgreen" }}>
            {fullSchedule.mondayA[level][time]}
          </td>
        );
      } else if (fullSchedule.mondayA[level][time] === "bars") {
        cells.push(
          <td key={`${time}${level}`} style={{ backgroundColor: "lightblue" }}>
            {fullSchedule.mondayA[level][time]}
          </td>
        );
      } else if (fullSchedule.mondayA[level][time] === "beam") {
        cells.push(
          <td key={`${time}${level}`} style={{ backgroundColor: "lightpink" }}>
            {fullSchedule.mondayA[level][time]}
          </td>
        );
      } else if (fullSchedule.mondayA[level][time] === "floor") {
        cells.push(
          <td key={`${time}${level}`} style={{ backgroundColor: "gold" }}>
            {fullSchedule.mondayA[level][time]}
          </td>
        );
      } else {
        cells.push(<td key={`${time}${level}`}></td>);
      }
    }

    rows.push(
      <tr key={`${time}row`}>
        <td key={time}>{time}</td>
        {cells}
      </tr>
    );
  }

  return (
    <div width="90vw">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {levelHeaders}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
