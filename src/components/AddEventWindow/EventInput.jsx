export default function EventInput({ events, inputEvent, handleEventChange }) {
  const eventOptions = events.map((event) => {
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
