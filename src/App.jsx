import { useState } from "react";
import Calendar from "./components/Calendar";
import LevelInput from "./components/LevelInput";
import { addLevelsToDay, addEvent, fullSchedule } from "../server/server";
import { levelsList } from "../server/levels";

function App() {
  // For testing
  const subset = [];
  for (let i = 0; i < levelsList.length / 2; i++) {
    subset.push(levelsList[i]);
  }
  addLevelsToDay(subset, "mondayA");

  addEvent("mondayA", "pre3A", "vault", "5:30");
  addEvent("mondayA", "whiteRibA", "floor", "3:55");
  addEvent("mondayA", "bronzeMedA", "beam", "2:45");
  addEvent("mondayA", "silverMedA", "bars", "4:30");
  addEvent("mondayA", "pre3B", "vault", "5:25");

  // useState
  const [inputLevel, setInputLevel] = useState(subset[0]);

  // Event handlers
  const handleLevelChange = (e) => {
    setInputLevel(e.target.value);
  };

  return (
    <>
      {/* <h3>{inputLevel}</h3> */}
      <LevelInput
        day={fullSchedule.mondayA}
        inputLevel={inputLevel}
        handleLevelChange={handleLevelChange}
      />
      <Calendar day={fullSchedule.mondayA} />
    </>
  );
}

export default App;
