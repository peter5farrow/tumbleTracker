import axios from "axios";
import { useState } from "react";
import DurationInput from "./components/DurationInput";
import EventInput from "./components/EventInput";
import LevelInput from "./components/LevelInput";
import StartTimeInput from "./components/StartTimeInput";

const eventOptions = await axios.get("/api/events");
const timeOptions = await axios.get("/api/times");

export default function AddEventWindow({ inputDay, levelOptions, onClose }) {
  const [inputLevel, setInputLevel] = useState(levelOptions[0]);
  const [inputEvent, setInputEvent] = useState(eventOptions.data[0].eventCode);
  const [inputStartTime, setInputStartTime] = useState(timeOptions.data[0]);
  const [inputEndTime, setInputEndTime] = useState(timeOptions.data[5]);

  const handleLevelChange = (e) => {
    setInputLevel(e.target.value);
  };
  const handleEventChange = (e) => {
    setInputEvent(e.target.value);
  };
  const handleStartTimeChange = (e) => {
    setInputStartTime(e.target.value);
  };
  const handleEndTimeChange = (e) => {
    setInputEndTime(e.target.value);
  };
  const handleAddEvent = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put("/api/add-rotation", {
        day: inputDay,
        level: inputLevel,
        event: inputEvent,
        startTime: inputStartTime,
        endTime: inputEndTime,
      });
      console.log(res.data);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          const conflictedEvent = await axios.get(
            `/api/eventName/${inputEvent}`
          );
          alert(`Error: ${conflictedEvent.data} in use at selected time.`);
        } else {
          alert(`Unexpected error: ${err.response.status}`);
        }
      } else {
        console.error(err);
        alert("Unknown error occurred.");
      }
    }
  };

  return (
    <div style={{ border: "2px solid lightgray", marginBottom: "2em" }}>
      <form action="/api/add-event">
        <LevelInput
          levelOptions={levelOptions}
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
          inputDuration={inputEndTime}
          handleDurationChange={handleEndTimeChange}
        />
        <button onClick={handleAddEvent} type="submit">
          Submit
        </button>
      </form>
      <button onClick={onClose}>X</button>
    </div>
  );
}

//WORK ON DURATION AND INPUTS
