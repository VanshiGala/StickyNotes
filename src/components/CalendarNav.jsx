import React, { useState, useEffect, use } from "react";
import { NavLink } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

function CalendarNav() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [eventText, setEventText] = useState("");
  const [Events, setEvents] = useState({});
  console.log("Calendar component loaded");

  const toggle = () => setModal(!modal);

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
    <Container>
      <Row className="justify-center">
        <Col xs="12" className="text-center mb-4 p-3">
          <NavLink
            to="/calendar"
            className="text-blue-600 text-xl font-semibold hover:text-blue-800 "
          >
            Calendar
          </NavLink>
        </Col>

        <Col xs="12" md="6" lg="4">
          <div className="flex justify-center w-full">
            <Calendar
              onChange={setCurrentDate}
              onClickDay={handleClick}
              value={currentDate || ""}
              className="w-full max-w-sm text-black no-underline"
              tileClassName={({ date }) => {
                if (date.getDay() === 0) {
                  return "text-red-600 font-semibold";
                }
                return "text-gray-800";
              }}
            />
          </div>
        </Col>
      </Row>

      <Modal
        isOpen={modal}
        toggle={toggle}
        className="border w-60 ml-50  rounded flex justify-center"
        centered
      >
        <ModalHeader toggle={toggle}>
          Add event on {currentDate.toDateString()}
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={eventText}
            placeholder="Enter Event Details Here "
            onChange={(e) => setEventText(e.target.value)}
            className="border mb-4"
          />
        </ModalBody>
        <ModalFooter>
          <button onClick={toggle} className="cursor-pointer border p-1">
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="cursor-pointer border p-1 ml-4"
          >
            Add
          </button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default CalendarNav;
