import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddEventButton from "./components/AddEventButton.jsx";
import AddEventWindow from "../AddEventWindow/AddEventWindow.jsx";
import DayInput from "./components/DayInput.jsx";
import EditDataButton from "./components/EditDataButton.jsx";

const dayOptions = await axios.get("/api/days");
const timeOptions = await axios.get("/api/times");
const demoDay = await axios.get("/api/day/monA");

export default function Calendar() {
  const [inputDay, setInputDay] = useState("monA");
  const [today, setToday] = useState(demoDay.data);

  useEffect(() => {
    const fetchDay = async () => {
      const res = await axios.get(`/api/day/${inputDay}`);
      setToday(res.data);
    };
    fetchDay();
  }, [inputDay]);

  const navigate = useNavigate();

  const handleDayChange = (e) => {
    setInputDay(e.target.value);
  };

  const coachesArray = [];

  today.levels.forEach((level) => {
    level.coaches.forEach((coach) => {
      if (!coachesArray.includes(coach.coachName)) {
        coachesArray.push(coach.coachName);
      }
    });
    return;
  });

  const coachHeaders = coachesArray.map((coach) => {
    return <th key={coach}>{coach}</th>;
  });

  // const levelHeaders = today.levels.map((level) => {
  //   return <th key={level.levelCode}>{level.levelName}</th>;
  // });

  const rows = [];
  for (const time of timeOptions.data) {
    const cells = [];

    for (const coach of coachesArray) {
      for (const level of today.levels) {
        const coachNameArray = [];
        for (const coach of level.coaches) {
          coachNameArray.push(coach.coachName);
        }
        if (coachNameArray.includes(coach)) {
          // if (level.times[time] === "recVault") {
          //   cells.push(
          //     <td
          //       key={`${time}${level.levelCode}`}
          //       style={{ backgroundColor: "lightgreen" }}
          //     >
          //       {level.times[time]}
          //     </td>
          //   );
          // } else if (level.times[time] === "recBars") {
          //   cells.push(
          //     <td
          //       key={`${time}${level.levelCode}`}
          //       style={{ backgroundColor: "lightblue" }}
          //     >
          //       {level.times[time]}
          //     </td>
          //   );
          // } else if (level.times[time] === "recBeam") {
          //   cells.push(
          //     <td
          //       key={`${time}${level.levelCode}`}
          //       style={{ backgroundColor: "lightpink" }}
          //     >
          //       {level.times[time]}
          //     </td>
          //   );
          // } else if (level.times[time] === "recFloorA") {
          //   cells.push(
          //     <td
          //       key={`${time}${level.levelCode}`}
          //       style={{ backgroundColor: "gold" }}
          //     >
          //       {level.times[time]}
          //     </td>
          //   );
          // } else {
          cells.push(
            <td key={`${time}${level.levelCode}`}>{level.times[time]}</td>
          );
        }
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
  const handleEditingData = () => {
    navigate("/editData");
  };

  if (addingEvent) {
    return (
      <div width="90vw">
        <EditDataButton onClick={handleEditingData} />
        <AddEventWindow
          inputDay={inputDay}
          today={today}
          setToday={setToday}
          onClose={handleAddingEvent}
        />
        <table>
          <thead>
            <tr>
              <th>Time</th>
              {coachHeaders}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  } else if (!addingEvent && today.levels.length === 0) {
    return (
      <div width="90vw">
        <EditDataButton onClick={handleEditingData} />
        <DayInput
          days={dayOptions.data}
          inputDay={inputDay}
          handleDayChange={handleDayChange}
        />
        <table>
          <thead>
            <tr>
              <th>Time</th>
              {coachHeaders}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div width="90vw">
        <EditDataButton onClick={handleEditingData} />
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
              {coachHeaders}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}
