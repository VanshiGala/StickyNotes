import React, { useState, useEffect, use } from "react";
import { NavLink } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Input } from "reactstrap";

function CalendarNav() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [eventText, setEventText] = useState("");
  const [Events, setEvents] = useState();
  console.log("Calendar component loaded");

  const toggle = () => {
    setModal(!modal), setEventText("");
  };

  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(Events));
  }, [Events]);

  const handleSave = () => {
    setEvents((prev) => ({
      ...prev,
      [currentDate.toDateString()]: eventText,
    }));
    toggle();
    setTimeout(() => {
      window.dispatchEvent(new Event("storage"));
    }, 0);
    setModal(false);
  };

  const handleClick = (currentDate) => {
    setCurrentDate(currentDate);
    setEventText(Events[currentDate.toDateString() || ""]);
    toggle();
  };

  useEffect(() => {
    return () => {
      setEventText("");
      setModal(false);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center px-4">
      <div className="w-full text-center mb-6 pt-4">
        <NavLink
          to="/calendar"
          className="text-blue-600 text-xl font-semibold hover:text-blue-800 "
        >
          Calendar
        </NavLink>
      </div>

      <div className="transform scale-70 ml-50 origin-top-left">
        <Calendar
          onChange={setCurrentDate}
          onClickDay={handleClick}
          value={currentDate || ""}
          className="w-full max-w-xs  text-black text-xl no-underline"
          tileClassName={({ date }) => {
            if (date.getDay() === 0) {
              return "text-red-600 font-semibold";
            }
            return "text-gray-800";
          }}
        />
      </div>

      {modal && (
        <div className="fixed inset-0 text-black bg-opacity-40 z-50 flex justify-center items-start pt-85">
          <div className="bg-white rounded-lg shadow-lg w-90 p-4 ml-30">
            <h2 className="text-lg font-bold mb-4">
              Add event on {currentDate.toDateString()}
            </h2>
            <Input
              type="text"
              value={eventText}
              placeholder="Enter Event Details Here"
              onChange={(e) => setEventText(e.target.value)}
              className="border mb-4 w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={toggle}
                className="px-4 py-1 border rounded cursor-pointer bg-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1 border rounded cursor-pointer bg-blue-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarNav;
