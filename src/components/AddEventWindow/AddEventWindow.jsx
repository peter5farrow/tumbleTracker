import EventInput from "./EventInput";
import LevelInput from "./LevelInput";
import StartTimeInput from "./StartTimeInput";

export default function AddEventWindow() {
  return (
    <div>
      <LevelInput />
      <EventInput />
      <StartTimeInput />
    </div>
  );
}
