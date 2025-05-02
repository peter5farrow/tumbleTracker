import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DayInput from "../CalendarPage/components/DayInput";
import LevelCheckboxes from "./components/LevelCheckboxes";

const dayOptions = await axios.get("/api/days");
const levelOptions = await axios.get("/api/levels");
const coachOptions = await axios.get("/api/coaches");

export default function EditDataPage() {
  const [inputDay, setInputDay] = useState("monA");
  const [selectedLevels, setSelectedLevels] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      const res = await axios.get(`/api/levels/${inputDay}`);
      const levelObjs = res.data;
      const levelsCodesArr = levelObjs.map((obj) => obj.levelCode);
      setSelectedLevels(levelsCodesArr);
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
    console.log(res.data);
    navigate("/calendar");
  };
  console.log(inputDay);
  console.log(selectedLevels);

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
