import { levelsList } from "../../server/levels";
import { fullSchedule, addLevelsToDay } from "../../server/tumbleTracker";

export default function Calendar() {
  const levelHeaders = levelsList.map((level) => {
    if (levelsList.indexOf(level) < levelsList.length / 2) {
      return <th key={level}>{level}</th>;
    }
  });

  const cells = levelsList.map((level) => {
    if (levelsList.indexOf(level) < levelsList.length / 2) {
      return <td key={`${level}1`}></td>;
    }
  });
  const subset = [];
  for (let i = 0; i < 2; i++) {
    subset.push(levelsList[i]);
  }

  addLevelsToDay(subset, "mondayA");
  // console.log(fullSchedule.mondayA.pre3A);

  const rows = [];
  for (const time in fullSchedule.mondayA.pre3A) {
    rows.push(
      <tr key={time}>
        <td>{time}</td>
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
