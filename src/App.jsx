import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import DayInput from "./components/DayInput";
import LevelInput from "./components/AddEventWindow/LevelInput";
import EventInput from "./components/AddEventWindow/EventInput";
import axios from "axios";
import StartTimeInput from "./components/AddEventWindow/StartTimeInput";
import LevelCheckboxes from "./components/LevelCheckboxes";
import DurationInput from "./components/AddEventWindow/DurationInput";

const dayOptions = await axios.get("/api/days");
const levelOptions = await axios.get("/api/levels");
const eventOptions = await axios.get("/api/events");
const timeOptions = await axios.get("/api/times");

function App() {
  useEffect(() => {
    const runDemo = async () => {
      const res = await axios.put("/api/add-levels", {
        levels: ["pre3A", "pre3B", "pre45A", "pre45B"],
        day: "mondayA",
      });
    };
    runDemo();
  }, []);

  const [inputDay, setInputDay] = useState("mondayA");
  const [today, setToday] = useState({});

  useEffect(() => {
    const fetchDayObject = async () => {
      const res = await axios.get(`/api/day${inputDay}`);
      setToday(res.data);
    };
    fetchDayObject();
  }, [inputDay]);

  const [inputLevel, setInputLevel] = useState("pre3A");
  const [inputEvent, setInputEvent] = useState(eventOptions.data[0]);
  const [inputStartTime, setInputStartTime] = useState(timeOptions.data[0]);
  const [inputDuration, setInputDuration] = useState(10);

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
  const handleDurationChange = (e) => {
    setInputDuration(e.target.value);
  };

  return (
    <>
      {/* <div>
        <LevelCheckboxes levels={levelOptions.data} day={inputDay} />
      </div> */}
      <div>
        <h3>{inputDay}</h3>
        <DayInput
          days={dayOptions.data}
          inputDay={inputDay}
          handleDayChange={handleDayChange}
        />

        <h3>{inputLevel}</h3>
        <LevelInput
          day={today}
          inputLevel={inputLevel}
          handleLevelChange={handleLevelChange}
        />

        <h3>{inputEvent}</h3>
        <EventInput
          events={eventOptions.data}
          inputEvent={inputEvent}
          handleEventChange={handleEventChange}
        />

        <h3>{inputStartTime}</h3>
        <StartTimeInput
          times={timeOptions.data}
          handleStartTimeChange={handleStartTimeChange}
        />

        <h3>{inputDuration}</h3>
        <DurationInput
          inputDuration={inputDuration}
          handleDurationChange={handleDurationChange}
        />
      </div>
      <Calendar day={today} times={timeOptions.data} />
    </>
  );
}

export default App;
