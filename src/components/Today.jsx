import React, { useEffect, useState } from "react";

function Today() {
  const [todayEvents, setTodayEvents] = useState([]);
  const [checked, setChecked] = useState({});
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("calendarEvents");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const today = new Date().toDateString();
        setTodayDate(today);
        const events = parsed[today];

        if (Array.isArray(events)) {
          setTodayEvents(events);
        } else if (typeof events === "string") {
          setTodayEvents([{ text: events, checked: false }]);
        } else {
          setTodayEvents([]);
        }
      } catch (error) {
        console.error("Failed to parse events:", error);
        setTodayEvents([]);
      }
    }
  }, []);

  const handleCheckboxChange = (index) => {
    setChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="p-4 max-w-md mx-auto text-black">
      <h2 className="font-semibold mt-4 text-2xl">Today's Events</h2>
      {todayEvents.length > 0 ? (
        todayEvents.map((event, index) => (
          <div
            key={index}
            className="mt-4 border rounded p-2 flex flex-col items-start"
          >
            <p className="text-lg text-black font-semibold  mb-1">
              {todayDate}
            </p>

            <p
              className={
                checked[index]
                  ? "line-through text-gray-500 flex justify-between"
                  : ""
              }
            >
              {event?.text ?? "No text"}
            </p>
            <input
              type="checkbox"
              checked={checked[index] || false}
              onChange={() => handleCheckboxChange(index)}
              className="ml-auto"
            />
          </div>
        ))
      ) : (
        <p className="text-xl mt-12 text-center">No events for today.</p>
      )}
    </div>
  );
}

export default Today;
