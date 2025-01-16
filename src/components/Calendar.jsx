import axios from "axios";

export default function Calendar({ day }) {
  async function getScheduleAtDay(day) {
    const res = await axios.get("/api/day");
    return res.data;
  }

  const today = getScheduleAtDay(day);

  // Headers
  const levelHeaders = Object.keys(today).map((level) => {
    return <th key={level}>{level}</th>;
  });

  // BUG ALERT! If the same group changes events at a certain time, remove all of the previous event, not just the overlapping slots.

  // Generating cells
  // TO DO! Add forEach day functionality
  const rows = [];
  for (const time in times) {
    const cells = [];

    for (const level in today) {
      if (today[level][time] === "vault") {
        cells.push(
          <td key={`${time}${level}`} style={{ backgroundColor: "lightgreen" }}>
            {today[level][time]}
          </td>
        );
      } else if (today[level][time] === "bars") {
        cells.push(
          <td key={`${time}${level}`} style={{ backgroundColor: "lightblue" }}>
            {today[level][time]}
          </td>
        );
      } else if (today[level][time] === "beam") {
        cells.push(
          <td key={`${time}${level}`} style={{ backgroundColor: "lightpink" }}>
            {today[level][time]}
          </td>
        );
      } else if (today[level][time] === "floor") {
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
