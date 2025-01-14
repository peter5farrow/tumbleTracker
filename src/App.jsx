import { useState } from "react";
import Calendar from "./components/Calendar";
import LevelInput from "./components/LevelInput";
import { addLevelsToDay, addEvent, fullSchedule } from "../server/server";
import { events, levelsList } from "../server/levels";
import EventInput from "./components/EventInput";

function App() {
  // For testing
  const subset = [];
  for (let i = 0; i < levelsList.length / 2; i++) {
    subset.push(levelsList[i]);
  }
  addLevelsToDay(subset, "mondayA");

  addEvent("mondayA", "pre3A", "vault", "5:30");
  addEvent("mondayA", "redRibA", "floor", "2:35");
  addEvent("mondayA", "bronzeMedA", "beam", "2:45");
  addEvent("mondayA", "silverMedA", "bars", "4:30");
  addEvent("mondayA", "pre3B", "vault", "5:25");

  // useState
  const [inputLevel, setInputLevel] = useState(subset[0]);
  const [inputEvent, setInputEvent] = useState(events[0]);

  // Event handlers
  const handleLevelChange = (e) => {
    setInputLevel(e.target.value);
  };
  const handleEventChange = (e) => {
    setInputEvent(e.target.value);
  };

  return (
    <>
      <div>
        <h3>{inputLevel}</h3>
        <LevelInput
          day={fullSchedule.mondayA}
          inputLevel={inputLevel}
          handleLevelChange={handleLevelChange}
        />

        <h3>{inputEvent}</h3>
        <EventInput
          day={fullSchedule.mondayA}
          inputEvent={inputEvent}
          handleEventChange={handleEventChange}
        />
      </div>
      <Calendar day={fullSchedule.mondayA} />
    </>
  );
}

export default App;
