import axios from "axios";
import { useState } from "react";
import DayInput from "../CalendarPage/components/DayInput";
import LevelCheckboxes from "./components/LevelCheckboxes";

const dayOptions = await axios.get("/api/days");
const levelOptions = await axios.get("/api/levels");
const coachOptions = await axios.get("/api/coaches");

export default function EditDataPage() {
  const [inputDay, setInputDay] = useState("monA");
  const [selectedLevels, setSelectedLevels] = useState([]);

  const handleDayChange = (e) => {
    setInputDay(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.put("/api/add-levels", {
      day: inputDay,
      levels: selectedLevels,
    });
  };

  return (
    <>
      <DayInput
        days={dayOptions.data}
        inputDay={inputDay}
        handleDayChange={handleDayChange}
      />
      <LevelCheckboxes
        levels={levelOptions.data}
        selectedLevels={selectedLevels}
        setSelectedLevels={setSelectedLevels}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
