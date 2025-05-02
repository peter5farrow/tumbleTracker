export default function EndTimeInput({ times, handleEndTimeChange }) {
  const timeOptions = times.map((time) => {
    return (
      <option key={time} value={time}>
        {time}
      </option>
    );
  });

  return (
    <div>
      <label htmlFor="endTimeInput">End Time: </label>
      <select id="endTimeInput" onChange={handleEndTimeChange}>
        {timeOptions}
      </select>
    </div>
  );
}
