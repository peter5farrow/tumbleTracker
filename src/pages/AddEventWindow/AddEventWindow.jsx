import DurationInput from "./components/DurationInput";
import EventInput from "./components/EventInput";
import LevelInput from "./components/LevelInput";
import StartTimeInput from "./components/StartTimeInput";

export default function AddEventWindow({
  today,
  inputLevel,
  handleLevelChange,
  eventOptions,
  inputEvent,
  handleEventChange,
  timeOptions,
  handleStartTimeChange,
  inputDuration,
  handleDurationChange,
  handleAddEvent,
}) {
  return (
    <div>
      <form action="/api/add-event">
        <LevelInput
          day={today}
          inputLevel={inputLevel}
          handleLevelChange={handleLevelChange}
        />

        <EventInput
          events={eventOptions}
          inputEvent={inputEvent}
          handleEventChange={handleEventChange}
        />

        <StartTimeInput
          times={timeOptions}
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
