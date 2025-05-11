import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DayInput from "../CalendarPage/components/DayInput";
import LevelCheckboxes from "./components/LevelCheckboxes";
import LevelInput from "../AddEventWindow/components/LevelInput";
import CoachCheckboxes from "./components/CoachCheckboxes";

const dayOptions = await axios.get("/api/days");
const levelOptions = await axios.get("/api/levels");
const coachOptions = await axios.get("/api/coaches");

export default function EditDataPage() {
  const [inputDay, setInputDay] = useState("monA");
  const [inputLevel, setInputLevel] = useState("pre3A");
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedCoaches, setSelectedCoaches] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      const res = await axios.get(`/api/levels/${inputDay}`);
      const levelObjs = res.data;
      if (levelObjs.length > 0) {
        const levelsCodesArr = levelObjs.map((obj) => obj.levelCode);
        setSelectedLevels(levelsCodesArr);
      }
    };
    fetchLevels();
  }, [inputDay]);

  useEffect(() => {
    const fetchCoaches = async () => {
      const res = await axios.get(`/api/coaches/${inputLevel}`);
      const coachObjs = res.data;
      if (coachObjs.length > 0) {
        const coachIdsArr = coachObjs.map((obj) => obj.coachId);
        setSelectedCoaches(coachIdsArr);
      }
    };
    fetchCoaches();
  }, [inputLevel]);

  const navigate = useNavigate();

  const handleDayChange = (e) => {
    setInputDay(e.target.value);
  };

  const handleLevelChange = (e) => {
    setInputLevel(e.target.value);
  };

  const handleSubmitLevels = async (e) => {
    e.preventDefault();
    const res = await axios.put("/api/update-levels", {
      day: inputDay,
      levels: selectedLevels,
    });
    navigate("/");
  };

  const handleSubmitCoaches = async (e) => {
    e.preventDefault();
    const res = await axios.put("/api/update-coaches", {
      level: inputLevel,
      coaches: selectedCoaches,
    });
    navigate("/");
  };

  return (
    <>
      <div>
        <DayInput
          days={dayOptions.data}
          inputDay={inputDay}
          handleDayChange={handleDayChange}
        />
        <LevelCheckboxes
          levelOptions={levelOptions.data}
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
          handleSubmit={handleSubmitLevels}
        />
      </div>
      <div>
        <LevelInput
          levelOptions={levelOptions.data}
          inputLevel={inputLevel}
          handleLevelChange={handleLevelChange}
        />
        <CoachCheckboxes
          coachOptions={coachOptions.data}
          selectedCoaches={selectedCoaches}
          setSelectedCoaches={setSelectedCoaches}
          handleSubmit={handleSubmitCoaches}
        />
      </div>
    </>
  );
}
