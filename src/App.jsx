import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div style={{ backgroundColor: "rgb(40, 40, 40)" }}>
        <h1>Tumble Tracker</h1>
        <Outlet />
      </div>
    </>
  );
}

export default App;
