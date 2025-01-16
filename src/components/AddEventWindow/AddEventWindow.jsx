import EventInput from "./EventInput";
import LevelInput from "./LevelInput";
import StartTimeInput from "./StartTimeInput";

export default function AddEventWindow() {
  return (
    <div>
      <form action="/api/add-event">
        <LevelInput />
        <EventInput />
        <StartTimeInput />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
