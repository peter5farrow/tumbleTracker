import axios from "axios";
import { useEffect, useState } from "react";
import DurationInput from "./components/DurationInput";
import EventInput from "./components/EventInput";
import LevelInput from "./components/LevelInput";
import StartTimeInput from "./components/StartTimeInput";

const levelOptions = await axios.get("/api/levels");
const eventOptions = await axios.get("/api/events");
const timeOptions = await axios.get("/api/times");

export default function AddEventWindow({ today, onClose }) {
  const [inputLevel, setInputLevel] = useState(levelOptions.data[0].levelCode);
  const [inputEvent, setInputEvent] = useState(eventOptions.data[0].eventCode);
  const [inputStartTime, setInputStartTime] = useState(timeOptions.data[0]);
  const [inputDuration, setInputDuration] = useState(10);

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
        day: today["dayCode"],
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
    <div>
      <form action="/api/add-event">
        <LevelInput
          day={today}
          inputLevel={inputLevel}
          handleLevelChange={handleLevelChange}
        />

        <EventInput
          events={eventOptions.data}
          inputEvent={inputEvent}
          handleEventChange={handleEventChange}
        />

        <StartTimeInput
          times={timeOptions.data}
          handleStartTimeChange={handleStartTimeChange}
        />

        <DurationInput
          inputDuration={inputDuration}
          handleDurationChange={handleDurationChange}
        />
        <button onClick={handleAddEvent} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
