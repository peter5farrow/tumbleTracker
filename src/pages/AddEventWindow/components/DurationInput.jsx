export default function DurationInput({ inputDuration, handleDurationChange }) {
  let durationOptions = [];
  for (let i = 10; i <= 45; i += 5) {
    durationOptions.push(
      <option key={`${i} min`} value={i}>{`${i} min`}</option>
    );
  }

  return (
    <div>
      <label htmlFor="durationInput">Duration: </label>
      <select
        id="durationInput"
        defaultValue={inputDuration}
        onChange={handleDurationChange}
      >
        {durationOptions}
      </select>
    </div>
  );
}
