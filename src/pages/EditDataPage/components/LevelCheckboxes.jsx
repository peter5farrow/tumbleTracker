// export default function LevelCheckboxes({ levels }) {
//   const levelOptions = levels.map((level) => {
//     return (
//       <label key={level}>
//         <input type="checkbox" name={level} value={level} />
//         {level}
//       </label>
//     );
//   });

//   return (
//     <div>
//       <form action="/api/add-levels">
//         {levelOptions}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";

export default function LevelCheckboxes({ levels, day }) {
  const [selectedLevels, setSelectedLevels] = useState([]);

  // Handle checkbox change
  const handleChange = (event) => {
    const level = event.target.value;
    setSelectedLevels((prevSelected) =>
      prevSelected.includes(level)
        ? prevSelected.filter((item) => item !== level)
        : [...prevSelected, level]
    );
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission (page reload)

    // You can handle the form submission here, e.g., send the data via an API request
    const res = await axios.put("/api/add-levels", [selectedLevels, day]);
    // Or perform an API call to "/api/add-levels" with the selected levels
  };

  const levelOptions = levels.map((level) => {
    return (
      <label key={level.levelCode}>
        <input
          type="checkbox"
          name={level.levelCode}
          value={level.levelCode}
          checked={selectedLevels.includes(level.levelCode)}
          onChange={handleChange}
        />
        {level.levelName}
      </label>
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {levelOptions}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
