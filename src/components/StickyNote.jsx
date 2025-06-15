import React from "react";

const StickyNote = ({ title, content, color, onDelete }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md w-full h-auto min-h-[150px] ${color} text-black break-words whitespace-pre-wrap overflow-hidden relative`}
    >
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
      >
        Delete
      </button>
      <h2 className="text-xl font-bold mb-2 break-words">{title}</h2>
      <p className="break-words whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export default StickyNote;
