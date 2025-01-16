import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import DayInput from "./components/DayInput";
import LevelInput from "./components/AddEventWindow/LevelInput";
import EventInput from "./components/AddEventWindow/EventInput";
import axios from "axios";
import StartTimeInput from "./components/AddEventWindow/StartTimeInput";

const dayOptions = await axios.get("/api/days");
const timeOptions = await axios.get("/api/times");

function App() {
  const events = ["a, b, c, d"];

  const [inputDay, setInputDay] = useState("mondayA");

  const fetchDayObject = async () => {
    const res = await axios.get(`/api/day${inputDay}`);
    return res.data;
  };

  const [inputLevel, setInputLevel] = useState("pre3A");
  const [inputEvent, setInputEvent] = useState(events[0]);
  const [inputStartTime, setInputStartTime] = useState("2:30");

  // Event handlers
  const handleDayChange = (e) => {
    setInputDay(e.target.value);
  };
  const handleLevelChange = (e) => {
    setInputLevel(e.target.value);
  };
  const handleEventChange = (e) => {
    setInputEvent(e.target.value);
  };
  const handleStartTimeChange = (e) => {
    setInputStartTime(e.target.value);
  };

  return (
    <>
      <div>
        <h3>{inputDay}</h3>
        <DayInput
          dayOptions={dayOptions.data}
          inputDay={inputDay}
          handleDayChange={handleDayChange}
        />

        <h3>{inputLevel}</h3>
        <LevelInput
          day={fetchDayObject(inputDay)}
          inputLevel={inputLevel}
          handleLevelChange={handleLevelChange}
        />

        <h3>{inputEvent}</h3>
        <EventInput
          level={inputLevel}
          inputEvent={inputEvent}
          handleEventChange={handleEventChange}
        />

        <h3>{inputStartTime}</h3>
        <StartTimeInput
          times={timeOptions.data}
          handleStartTimeChange={handleStartTimeChange}
        />
      </div>
      <Calendar day={fetchDayObject(inputDay)} times={timeOptions.data} />
    </>
  );
}

export default App;
