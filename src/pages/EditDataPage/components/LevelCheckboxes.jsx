export default function LevelCheckboxes({
  levelOptions,
  selectedLevels,
  setSelectedLevels,
  handleSubmit,
}) {
  const handleChange = (event) => {
    const level = event.target.value;
    setSelectedLevels((prevSelected) =>
      prevSelected.includes(level)
        ? prevSelected.filter((item) => item !== level)
        : [...prevSelected, level]
    );
  };

  const levelBoxes = levelOptions.map((level) => {
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
        {levelBoxes}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
