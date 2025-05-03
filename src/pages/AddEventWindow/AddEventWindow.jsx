import axios from "axios";
import { useState } from "react";
import EventInput from "./components/EventInput";
import LevelInput from "./components/LevelInput";
import StartTimeInput from "./components/StartTimeInput";
import EndTimeInput from "./components/EndTimeInput";

const eventOptions = await axios.get("/api/events");
const timeOptions = await axios.get("/api/times");

export default function AddEventWindow({ inputDay, levelOptions, onClose }) {
  const [inputLevel, setInputLevel] = useState(levelOptions[0].levelCode);
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

      const objToSend = {
        day: inputDay,
        level: inputLevel,
        event: inputEvent,
        startTime: inputStartTime,
        endTime: inputEndTime,
      };

      const res = await axios.put("/api/add-rotation", objToSend);
      console.log(res.data);

      // Ideally change this to just refetch rotations
      location.reload();
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          alert(`Error: ${inputEvent} in use at selected time.`);
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

        <EndTimeInput
          times={timeOptions.data}
          handleEndTimeChange={handleEndTimeChange}
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
