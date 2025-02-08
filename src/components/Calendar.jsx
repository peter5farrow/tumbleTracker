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
      if (level[time] === "recVault") {
        cells.push(
          <td
            key={`${time}${level.levelCode}`}
            style={{ backgroundColor: "lightgreen" }}
          >
            {level[time]}
          </td>
        );
      } else if (level[time] === "recBars") {
        cells.push(
          <td
            key={`${time}${level.levelCode}`}
            style={{ backgroundColor: "lightblue" }}
          >
            {level[time]}
          </td>
        );
      } else if (level[time] === "recBeam") {
        cells.push(
          <td
            key={`${time}${level.levelCode}`}
            style={{ backgroundColor: "lightpink" }}
          >
            {level[time]}
          </td>
        );
      } else if (level[time] === "recFloorA") {
        cells.push(
          <td
            key={`${time}${level.levelCode}`}
            style={{ backgroundColor: "gold" }}
          >
            {level[time]}
          </td>
        );
      } else {
        cells.push(<td key={`${time}${level.levelCode}`}>{level[time]}</td>);
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
