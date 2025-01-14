import { levelsList, levelsInfo, times } from "../../server/levels";
import { fullSchedule, addLevelsToDay, addEvent } from "../../server/server";

export default function Calendar({ day }) {
  // Headers
  const levelHeaders = levelsList.map((level) => {
    if (levelsList.indexOf(level) < levelsList.length / 2) {
      return <th key={level}>{level}</th>;
    }
  });

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
