import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddEventButton from "./components/AddEventButton.jsx";
import AddEventWindow from "../AddEventWindow/AddEventWindow.jsx";
import DayInput from "./components/DayInput.jsx";

const dayOptions = await axios.get("/api/days");
const timeOptions = await axios.get("/api/times");
const testInputDay = await axios.get("/api/day/monA");

export default function Calendar() {
  const [inputDay, setInputDay] = useState("monA");
  const [today, setToday] = useState(testInputDay.data);

  useEffect(() => {
    const fetchDayObject = async () => {
      const res = await axios.get(`/api/day/${inputDay}`);
      setToday(res.data);
    };

    fetchDayObject();
  }, [inputDay]);

  const handleDayChange = (e) => {
    setInputDay(e.target.value);
  };

  // Headers
  const levelHeaders = today.levels.map((level) => {
    return <th key={level.levelCode}>{level.levelName}</th>;
  });

  // BUG ALERT! If the same group changes events at a certain time, remove all of the previous event, not just the overlapping slots.

  // Generating cells
  const rows = [];
  for (const time of timeOptions.data) {
    const cells = [];

    for (const level of today.levels) {
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

  const [addingEvent, setAddingEvent] = useState(false);

  const handleAddingEvent = () => {
    setAddingEvent(!addingEvent);
  };

  if (addingEvent) {
    return (
      <div width="90vw">
        <AddEventWindow
          today={today}
          setToday={setToday}
          onClose={handleAddingEvent}
        />
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
  } else {
    return (
      <div width="90vw">
        <DayInput
          days={dayOptions.data}
          inputDay={inputDay}
          handleDayChange={handleDayChange}
        />
        <AddEventButton onClick={handleAddingEvent} />
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
}
