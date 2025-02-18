import { useEffect, useState } from "react";
import Calendar from "./pages/CalendarPage/Calendar";
import DayInput from "./pages/CalendarPage/components/DayInput";
import axios from "axios";
import LevelCheckboxes from "./pages/EditDataPage/components/LevelCheckboxes";
import AddEventWindow from "./pages/AddEventWindow/AddEventWindow";
import LevelInput from "./pages/AddEventWindow/components/LevelInput";

const dayOptions = await axios.get("/api/days");
const levelOptions = await axios.get("/api/levels");
const eventOptions = await axios.get("/api/events");
const timeOptions = await axios.get("/api/times");
const coachOptions = await axios.get("/api/coaches");
const testInputDay = await axios.get("/api/day/monA");

function App() {
  const [inputDay, setInputDay] = useState("monA");
  const [today, setToday] = useState(testInputDay.data);

  useEffect(() => {
    const fetchDayObject = async () => {
      const res = await axios.get(`/api/day/${inputDay}`);
      setToday(res.data);
    };

    fetchDayObject();
  }, [inputDay]);

  const [inputLevel, setInputLevel] = useState(levelOptions.data[0].levelCode);
  const [inputEvent, setInputEvent] = useState(eventOptions.data[0].eventCode);
  const [inputStartTime, setInputStartTime] = useState(timeOptions.data[0]);
  const [inputDuration, setInputDuration] = useState(10);

  //
  // fix werid eseEffect rendering thing
  //

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
    try {
      e.preventDefault();
      const res = await axios.put("/api/add-event", {
        day: inputDay,
        level: inputLevel,
        event: inputEvent,
        startTime: inputStartTime,
        duration: inputDuration,
      });

      setToday(res.data);
    } catch (err) {
      const conflictedEvent = await axios.get(`/api/eventName/${inputEvent}`);

      alert(`Error: ${conflictedEvent.data} in use at selected time.`);
    }
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
        levelOptions={levelOptions.data}
        inputLevel={inputLevel}
        handleLevelChange={handleLevelChange}
        eventOptions={eventOptions.data}
        inputEvent={inputEvent}
        handleEventChange={handleEventChange}
        timeOptions={timeOptions.data}
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
