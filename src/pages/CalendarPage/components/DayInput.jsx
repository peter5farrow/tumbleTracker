export default function DayInput({ days, inputDay, handleDayChange }) {
  const dayOptions = days.map((day) => {
    return (
      <option key={day.dayCode} value={day.dayCode}>
        {day.dayName}
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
