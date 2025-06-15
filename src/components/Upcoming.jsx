import React, { useEffect, useState } from "react";

function Upcoming() {
  const [upcoming, setUpcoming] = useState([]);
  const load = () => {
    const stored = localStorage.getItem("calendarEvents");
    if (!stored) {
      return setUpcoming([]);
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const parsed = Object.entries(JSON.parse(stored))
      .map(([d, val]) => {
        if (typeof val == "string") {
          return {
            date: new Date(d),
            text: val,
            checked: false,
            rawDate: d,
          };
        } else {
          return {
            date: new Date(d),
            text: val.text,
            checked: val.checked,
            rawDate: d,
          };
        }
      })
      .filter((ev) => ev.date.getTime() >= today)
      .sort((a, b) => a.date - b.date);
    setUpcoming(parsed);
  };

  const toggleCheck = (dateKey) => {
    const stored = localStorage.getItem("calendarEvents");
    if (!stored) return;

    const events = JSON.parse(stored);
    const val = events[dateKey];

    if (typeof val === "string") {
      events[dateKey] = {
        text: val,
        checked: true,
      };
    } else {
      events[dateKey].checked = !events[dateKey].checked;
    }

    localStorage.setItem("calendarEvents", JSON.stringify(events));
    load();
  };

  useEffect(() => {
    load();
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("storage", load);
    };
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto text-black">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      {upcoming.length === 0 ? (
        <p className="text-gray-600">No events scheduled.</p>
      ) : (
        <ul className="space-y-3">
          {upcoming.map(({ date, text, checked, rawDate }, i) => (
            <li
              key={i}
              className={`border rounded p-3 shadow-sm flex items-center justify-between ${
                checked ? "bg-green-50" : ""
              }`}
            >
              <div>
                <div className="font-semibold">{date.toDateString()}</div>
                <div className={checked ? "line-through text-gray-500" : ""}>
                  {text}
                </div>
              </div>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleCheck(rawDate)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Upcoming;
