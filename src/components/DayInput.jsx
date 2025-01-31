export default function DayInput({ days, inputDay, handleDayChange }) {
  const dayOptions = days.map((day) => {
    return (
      <option key={day} value={day}>
        {day}
      </option>
    );
  });

  return (
    <div>
      <label htmlFor="dayInput">Day: </label>
      <select id="dayInput" defaultValue={inputDay} onChange={handleDayChange}>
        {dayOptions}
      </select>
    </div>
  );
}
