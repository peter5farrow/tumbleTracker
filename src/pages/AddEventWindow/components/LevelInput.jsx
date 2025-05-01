export default function LevelInput({
  levelOptions,
  inputLevel,
  handleLevelChange,
}) {
  const levelsForToday = levelOptions;

  const levels = levelsForToday.map((level) => {
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
        {levels}
      </select>
    </div>
  );
}
