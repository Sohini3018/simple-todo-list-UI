"use client"
import React, { useState } from "react";

const Todo = ({ task, index, handleDelete }) => {
  const [isDone, setIsDone] = useState(false);

  const handletaskDone = () => {
    setIsDone(!isDone);
  };

  return (
    <li className="flex flex-grow justify-center items-center bg-[#F4F2FF] border-0 rounded-lg m-5 p-3 flex-col gap-4 md:flex-row">
      <p className={`${isDone ? "line-through" : ""}`}>{task.title}</p>
      <button
        onClick={() => {
          handletaskDone(index);
        }}
      >
        Done
      </button>
      <button
        onClick={() => {
          handleDelete(index);
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default Todo;
