export default function Calendar({ day, times }) {
  // Headers
  const levelHeaders = day.levels.map((level) => {
    return <th key={level.levelCode}>{level.levelName}</th>;
  });

  // BUG ALERT! If the same group changes events at a certain time, remove all of the previous event, not just the overlapping slots.

  // Generating cells
  const rows = [];
  for (const time of times) {
    const cells = [];

    for (const level of day.levels) {
      if (level.times[time] === "recVault") {
        cells.push(
          <td
            key={`${time}${level.levelCode}`}
            style={{ backgroundColor: "lightgreen" }}
          >
            {level.times[time]}
          </td>
        );
      } else if (level.times[time] === "recBars") {
        cells.push(
          <td
            key={`${time}${level.levelCode}`}
            style={{ backgroundColor: "lightblue" }}
          >
            {level.times[time]}
          </td>
        );
      } else if (level.times[time] === "recBeam") {
        cells.push(
          <td
            key={`${time}${level.levelCode}`}
            style={{ backgroundColor: "lightpink" }}
          >
            {level.times[time]}
          </td>
        );
      } else if (level.times[time] === "recFloorA") {
        cells.push(
          <td
            key={`${time}${level.levelCode}`}
            style={{ backgroundColor: "gold" }}
          >
            {level.times[time]}
          </td>
        );
      } else {
        cells.push(
          <td key={`${time}${level.levelCode}`}>{level.times[time]}</td>
        );
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
