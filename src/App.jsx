import SideNav from "./SideNav";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import StickyWall from "./components/StickyWall";
import Today from "./components/Today";
import Upcoming from "./components/Upcoming";
import CalendarNav from "./components/CalendarNav";
import Home from "./components/Home";
import Login from "./components/Login";
import { useAuth } from "./AuthProvider";
import Welcome from "./components/Welcome";

import Work from "./components/Work";

function App() {
  const [isNav, setIsNav] = useState(false);
  const { user } = useAuth();

  const [events, setEvents] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    return Object.values(stored);
  });

  return (
    <div className=" relative min-h-screen bg-pink-100 w-full h-full  text-white overflow-x-hidden">
      {user && (
        <>
          <button
            onClick={() => setIsNav((prev) => !prev)}
            className="cursor-pointer fixed top-4 left-4 z-50 text-black"
          >
            Menu
          </button>
          <SideNav isSlided={isNav} isNotSlided={() => setIsNav(false)} />
        </>
      )}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/stickywall" element={<StickyWall />} />
          <Route path="/today" element={<Today events={events} />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/calendar" element={<CalendarNav />} />
          <Route path="/Work" element={<Work />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
