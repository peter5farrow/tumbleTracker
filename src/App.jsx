import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div style={{ width: "90vw" }}>
        <h1>Tumble Tracker</h1>
        <Outlet />
      </div>
    </>
  );
}

export default App;
