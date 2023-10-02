"use client";
import React, { useState } from "react";

const Todo = ({ task, index, handleDelete }) => {
  const [isDone, setIsDone] = useState(false);

  const handletaskDone = () => {
    setIsDone(!isDone);
  };

  return (
    <li className="flex w-[30rem] justify-between items-center bg-[#F4F2FF] border-0 rounded-lg m-5 p-3 flex-col gap-4 md:flex-row md:flex-grow">
      <div className="flex flex-col">
        <p className={`text-lg font-bold ${isDone ? "line-through" : ""}`}>
          {task.title}
        </p>
        <p className="text-md text-blue-800">{task.desc}</p>
      </div>

      <div className="flex justify-between w-[30%]">
        <button
          className="text-white bg-[#ecb800] hover:bg-yellow-700 rounded-md p-2"
          onClick={() => {
            handletaskDone(index);
          }}
        >
          Done
        </button>
        <button
          className="text-white bg-[#ea4863] hover:bg-red-600 rounded-md p-2"
          onClick={() => {
            handleDelete(index);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Todo;
