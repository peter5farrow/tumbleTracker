export default function LevelInput({ day, inputLevel, handleLevelChange }) {
  const levelsForToday = Object.keys(day);

  const levelOptions = levelsForToday.map((level) => {
    return (
      <option key={level} value={level}>
        {level}
      </option>
    );
  });

  return (
    <div>
      <label>Class: </label>
      <select
        name="levelInput"
        defaultValue={inputLevel}
        onChange={handleLevelChange}
      >
        {levelOptions}
      </select>
    </div>
  );
}
