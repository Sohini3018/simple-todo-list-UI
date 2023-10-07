"use client";
import React, { useState } from "react";

const Todo = ({ task, index, handleDelete,handleEdit }) => {
  const [isDone, setIsDone] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.desc);

  const handletaskDone = () => {
    setIsDone(!isDone);
  };

  const handleToggleEdit = () => {
    setToggleEdit(true);
  }

  const handleSaveEdit = ()=>{
    handleEdit(index,editedTitle,editedDesc);
    setToggleEdit(false);
  }

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
        <button onClick={handleToggleEdit}>Edit</button>
        {toggleEdit && (
        <div className="flex flex-col gap-3 mt-3">
          <input
            type="text"
            placeholder="Edit the title"
            className="bg-[#F4F2FF] p-2 border-2 border-gray-400 rounded-lg"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Edit the description"
            className="bg-[#F4F2FF] p-2 border-2 border-gray-400 rounded-lg"
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
          />
          <button
            className="text-white bg-green-400 hover:bg-green-700 rounded-md p-2"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        </div>
      )}
      </div>
    </li>
  );
};

export default Todo;
