export default function StartTimeInput({ times }) {
  const timeOptions = times.map((time) => {
    return (
      <option key={time} value={time}>
        {time}
      </option>
    );
  });

  return (
    <div>
      <label htmlFor="startTimeInput">Start time: </label>
      <select id="startTimeInput">{timeOptions}</select>
    </div>
  );
}
