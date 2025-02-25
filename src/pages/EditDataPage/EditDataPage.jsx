import axios from "axios";
import LevelCheckboxes from "./components/LevelCheckboxes";

const dayOptions = await axios.get("/api/days");
const levelOptions = await axios.get("/api/levels");
const coachOptions = await axios.get("/api/coaches");

export default function EditDataPage() {
  return <LevelCheckboxes levels={levelOptions.data} day="monA" />;
}
