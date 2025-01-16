import axios from "axios";
import { useEffect } from "react";

export default function DayInput({
  fetchDayOptions,
  inputDay,
  handleDayChange,
}) {
  // const dayOptions = fetchDayOptions.map((day) => {
  //   return (
  //     <option key={day} value={day}>
  //       {day}
  //     </option>
  //   );
  // });

  return (
    <div>
      <label htmlFor="dayInput">Day: </label>
      <select id="dayInput" defaultValue={inputDay} onChange={handleDayChange}>
        {/* {dayOptions} */}
      </select>
    </div>
  );
}
