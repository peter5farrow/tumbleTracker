import axios from "axios";

export default function Calendar({ day, times }) {
  // Headers
  const levelHeaders = Object.keys(day).map((level) => {
    return <th key={level}>{level}</th>;
  });

  // BUG ALERT! If the same group changes events at a certain time, remove all of the previous event, not just the overlapping slots.

  // Generating cells
  // TO DO! Add forEach day functionality
  const rows = [];
  for (const time in times) {
    const cells = [];

    for (const level in day) {
      if (day[level][time] === "vault") {
        cells.push(
          <td key={`${time}${level}`} style={{ backgroundColor: "lightgreen" }}>
            {today[level][time]}
          </td>
        );
      } else if (day[level][time] === "bars") {
        cells.push(
          <td key={`${time}${level}`} style={{ backgroundColor: "lightblue" }}>
            {today[level][time]}
          </td>
        );
      } else if (day[level][time] === "beam") {
        cells.push(
          <td key={`${time}${level}`} style={{ backgroundColor: "lightpink" }}>
            {today[level][time]}
          </td>
        );
      } else if (day[level][time] === "floor") {
        cells.push(
          <td key={`${time}${level}`} style={{ backgroundColor: "gold" }}>
            {today[level][time]}
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
