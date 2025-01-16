import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import DayInput from "./components/DayInput";
import LevelInput from "./components/AddEventWindow/LevelInput";
import EventInput from "./components/AddEventWindow/EventInput";
import axios from "axios";
import StartTimeInput from "./components/AddEventWindow/StartTimeInput";
import LevelCheckboxes from "./components/LevelCheckboxes";

const dayOptions = await axios.get("/api/days");
const levelOptions = await axios.get("/api/levels");
const eventOptions = await axios.get("/api/events");
const timeOptions = await axios.get("/api/times");

function App() {
  const [inputDay, setInputDay] = useState("mondayA");

  const fetchDayObject = async () => {
    const res = await axios.get(`/api/day${inputDay}`);
    return res.data;
  };

  const [inputLevel, setInputLevel] = useState("pre3A");
  const [inputEvent, setInputEvent] = useState(eventOptions.data[0]);
  const [inputStartTime, setInputStartTime] = useState(timeOptions.data[0]);

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
        <LevelCheckboxes levels={levelOptions.data} day={inputDay} />
      </div>
      <div>
        <h3>{inputDay}</h3>
        <DayInput
          days={dayOptions.data}
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
