import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import DayInput from "./components/DayInput";
import LevelInput from "./components/AddEventWindow/LevelInput";
import EventInput from "./components/AddEventWindow/EventInput";
import axios from "axios";
import StartTimeInput from "./components/AddEventWindow/StartTimeInput";
import LevelCheckboxes from "./components/LevelCheckboxes";
import DurationInput from "./components/AddEventWindow/DurationInput";
import AddEventWindow from "./components/AddEventWindow/AddEventWindow";

const schedule = await axios.get("/api/schedule");
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
  const handleAddEvent = async (e) => {
    e.preventDefault();
    const res = await axios.put("/api/add-event", {
      day: inputDay,
      level: inputLevel,
      event: inputEvent,
      startTime: inputStartTime,
      duration: inputDuration,
    });

    if (res.data.hasConflict) {
      alert(`Error: ${inputEvent} in use at selected time.`);
    }
    setToday(res.data.sched);
  };

  return (
    <>
      <DayInput
        days={dayOptions.data}
        inputDay={inputDay}
        handleDayChange={handleDayChange}
      />
      <AddEventWindow
        today={today}
        inputLevel={inputLevel}
        handleLevelChange={handleLevelChange}
        eventOptions={eventOptions}
        inputEvent={inputEvent}
        handleEventChange={handleEventChange}
        timeOptions={timeOptions}
        handleStartTimeChange={handleStartTimeChange}
        inputDuration={inputDuration}
        handleDurationChange={handleDurationChange}
        handleAddEvent={handleAddEvent}
      />
      <Calendar day={today} times={timeOptions.data} />
    </>
  );
}

export default App;
