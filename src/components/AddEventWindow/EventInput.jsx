export default function EventInput({ level, inputEvent, handleEventChange }) {
  const eventsForLevel = Object.keys(level);

  const eventOptions = eventsForLevel.map((event) => {
    return (
      <option key={event} value={event}>
        {event}
      </option>
    );
  });

  return (
    <div>
      <label htmlFor="eventInput">Event: </label>
      <select
        id="eventInput"
        defaultValue={inputEvent}
        onChange={handleEventChange}
      >
        {eventOptions}
      </select>
    </div>
  );
}
