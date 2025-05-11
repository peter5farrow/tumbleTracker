export default function CoachCheckboxes({
  coachOptions,
  selectedCoaches,
  setSelectedCoaches,
  handleSubmit,
}) {
  const handleChange = (e) => {
    const coach = +e.target.value;
    setSelectedCoaches((prevSelected) =>
      prevSelected.includes(coach)
        ? prevSelected.filter((item) => item !== coach)
        : [...prevSelected, coach]
    );
  };

  const coachBoxes = coachOptions.map((coach) => {
    return (
      <div key={coach.coachId}>
        <label>
          <input
            type="checkbox"
            name={coach.coachId}
            value={coach.coachId}
            checked={selectedCoaches.includes(coach.coachId)}
            onChange={handleChange}
          />
          {coach.coachName}
        </label>
        <br />
      </div>
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {coachBoxes}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
