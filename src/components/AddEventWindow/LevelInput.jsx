export default function LevelInput({ day, inputLevel, handleLevelChange }) {
  const levelsForToday = day.levels;

  const levelOptions = levelsForToday.map((level) => {
    return (
      <option key={level.levelCode} value={level.levelCode}>
        {level.levelName}
      </option>
    );
  });

  return (
    <div>
      <label htmlFor="levelInput">Level: </label>
      <select
        id="levelInput"
        defaultValue={inputLevel}
        onChange={handleLevelChange}
      >
        {levelOptions}
      </select>
    </div>
  );
}
