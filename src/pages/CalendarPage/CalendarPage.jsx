import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddEventButton from "./components/AddEventButton.jsx";
import AddEventWindow from "../AddEventWindow/AddEventWindow.jsx";
import DayInput from "./components/DayInput.jsx";
import EditDataButton from "./components/EditDataButton.jsx";

const dayOptions = await axios.get("/api/days");
const timeOptionsObj = await axios.get("/api/times");

export default function Calendar() {
  const [inputDay, setInputDay] = useState("monA");
  const [coachRotations, setCoachRotations] = useState([
    { name: "", rotations: [] },
  ]);
  const [levelOptions, setLevelOptions] = useState([]);

  useEffect(() => {
    const fetchCoachRotations = async () => {
      const res = await axios.get(`/api/rotations/${inputDay}`);
      setCoachRotations(res.data);
    };
    fetchCoachRotations();
  }, [inputDay]);

  useEffect(() => {
    const fetchLevelOptions = async () => {
      const res = await axios.get(`/api/levels/${inputDay}`);
      setLevelOptions(res.data);
    };
    fetchLevelOptions();
  }, [inputDay]);

  const navigate = useNavigate();

  const handleDayChange = (e) => {
    setInputDay(e.target.value);
  };

  const coachHeaders = coachRotations.map((coach) => {
    return <th key={coach.name}>{coach.name}</th>;
  });

  const timeOptions = timeOptionsObj.data;

  const rows = [];
  for (const time of timeOptions) {
    const cells = [];

    for (const coach of coachRotations) {
      if (coach.rotations.length > 0) {
        for (const rotation of coach.rotations) {
          if (
            timeOptions.indexOf(time) >=
              timeOptions.indexOf(rotation.startTime) &&
            timeOptions.indexOf(time) < timeOptions.indexOf(rotation.endTime)
          ) {
            cells.push(
              <td key={`${time}${coach.name}`}>{rotation.eventCode}</td>
            );
          } else {
            cells.push(<td key={`${time}${coach.name}`}></td>);
          }
        }
      } else {
        cells.push(<td key={`${time}${coach.name}`}></td>);
      }

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
      //   cells.push(
      //     <td key={`${time}${level.levelCode}`}>{level.times[time]}</td>
      //   );
      // }
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
  // const handleEditingData = () => {
  //   navigate("/editData");
  // };

  if (addingEvent) {
    return (
      <div width="90vw">
        {/* <EditDataButton onClick={handleEditingData}/> */}
        <AddEventWindow
          inputDay={inputDay}
          levelOptions={levelOptions}
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
  } else if (!addingEvent && levelOptions.length === 0) {
    return (
      <div width="90vw">
        {/* <EditDataButton onClick={handleEditingData} /> */}
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
        {/* <EditDataButton onClick={handleEditingData} /> */}
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
