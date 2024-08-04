import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import DailyLog from "./pages/DailyLog";
import Goals from "./pages/Goals";
import Badges from "./pages/Badges";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <SideBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/DailyLog" element={<DailyLog />} />
            <Route path="/Goals" element={<Goals />} />
            <Route path="/Badges" element={<Badges />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>

      {/* <div className="container">
        <SideBar />
        <Body />
      </div> */}
    </>
  );
}

export default App;
