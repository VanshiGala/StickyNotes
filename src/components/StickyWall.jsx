import React, { useState, useEffect } from "react";
import StickyNote from "./StickyNote";
import { Card, CardBody, Container, Row, Col } from "reactstrap";

const StickyWall = () => {
  const [notes, setNotes] = useState(() => {
    const stored = localStorage.getItem("stickyNotes");
    return stored ? JSON.parse(stored) : [];
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleAddNote = () => {
    if (title.trim() === "" || desc.trim() === "") {
      alert("Enter title and description");
      return;
    }

    const newNote = {
      id: Date.now(),
      title,
      content: desc,
      color: getRandomColor(),
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("stickyNotes", JSON.stringify(updatedNotes));
    setTitle("");
    setDesc("");
  };
  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("stickyNotes", JSON.stringify(updatedNotes));
  };

  const getRandomColor = () => {
    const colors = [
      "bg-yellow-200",
      "bg-blue-100",
      "bg-pink-100",
      "bg-orange-200",
      "bg-green-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="p-6">
      <Container className="w-full h-full">
        <h1 className="text-3xl font-bold mb-6 text-black flex justify-center">
          Sticky Wall
        </h1>

        <Row className="justify-center mb-4">
          <Col xs="12" md="8" lg="6">
            <Card className="mx-auto mb-4 border border-black p-4 rounded max-w-[400px]">
              <CardBody className="d-flex flex-column">
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className=" text-black p-2 rounded w-full md:w-1/4 break-words border border-black"
                />
                <br />
                <br />
                <textarea
                  placeholder="Enter description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="border border-black text-black p-2 rounded w-full md:w-1/2  whitespace-pre-wrap break-words overflow-hidden"
                ></textarea>
              </CardBody>
              <button
                onClick={handleAddNote}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Note
              </button>
            </Card>
          </Col>
        </Row>

        <Row>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-50">
            {notes.map((note) => (
              <Col key={note.id} xs="12" sm="6" lg="4" className="mb-4">
                <StickyNote
                  key={note.id}
                  title={note.title}
                  content={note.content}
                  color={note.color}
                  onDelete={() => handleDeleteNote(note.id)}
                />
              </Col>
            ))}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default StickyWall;
