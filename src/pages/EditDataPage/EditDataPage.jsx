import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DayInput from "../CalendarPage/components/DayInput";
import LevelCheckboxes from "./components/LevelCheckboxes";

const dayOptions = await axios.get("/api/days");
const levelOptions = await axios.get("/api/levels");
const coachOptions = await axios.get("/api/coaches");
const demoDay = await axios.get("/api/day/monA");

export default function EditDataPage() {
  const [inputDay, setInputDay] = useState("monA");
  const [selectedDay, setSelectedDay] = useState(demoDay.data);
  const [selectedLevels, setSelectedLevels] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      const res = await axios.get(`/api/day/${inputDay}`);
      setSelectedDay(res.data);
      const day = res.data;

      if (day.levels) {
        const alreadyAddedLevels = [];
        day.levels.forEach((level) => {
          alreadyAddedLevels.push(level.levelCode);
        });

        setSelectedLevels(alreadyAddedLevels);
      }
    };

    fetchLevels();
  }, [inputDay]);

  const navigate = useNavigate();

  const handleDayChange = (e) => {
    setInputDay(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.put("/api/update-levels", {
      day: inputDay,
      levels: selectedLevels,
    });
    navigate("/calendar");
  };

  return (
    <>
      <DayInput
        days={dayOptions.data}
        inputDay={inputDay}
        handleDayChange={handleDayChange}
      />
      <LevelCheckboxes
        levelOptions={levelOptions.data}
        selectedLevels={selectedLevels}
        setSelectedLevels={setSelectedLevels}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
