"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export const maxTitle = 30;
export const options = ["Personal", "Study", "Work", "Other"];

const Todo = ({ task, index, handleDelete, handleEdit }) => {

  const [isDone, setIsDone] = useState(task.done);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [isDetailsVisible, setDetailsVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.desc);
  // Category Actions
  const [editedCategory, setCategory] = useState(task.category);

  const handleTitle = (e) => {
    const title_ = e.target.value;
    if (title_.length <= maxTitle) {
      setEditedTitle(title_);
    }
  };

  const toggleDetails = () => {
    setDetailsVisible(!isDetailsVisible);
  };

  const handleTaskDone = () => {
    handleEdit(index, editedTitle, editedDesc, editedCategory, !isDone);
    setIsDone(!isDone);
  };

  const handleToggleEdit = () => {
    setToggleEdit(true);
  };

  const handleSaveEdit = () => {
    handleEdit(index, editedTitle, editedDesc, editedCategory, isDone);
    setToggleEdit(false);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <li className="flex flex-grow justify-between w-full md:w-auto md:min-w-[500px] max-w-2xl items-center bg-[#F4F2FF] rounded-lg px-5 py-3 my-5 md:mx-8 gap-4 md:flex-row md:flex-grow shadow-lg shadow-black/30">
      <div className="flex flex-col">
        {toggleEdit ? (
          <div className="flex flex-col gap-3 mt-3 w-[62vw] md:w-[40vw]">
            <input
              type="text"
              name="title"
              placeholder="Edit the title"
              className="bg-[#F4F2FF] w-auto p-2 border-2 border-[#2B1887] rounded-lg"
              value={editedTitle}
              onChange={handleTitle}
            />
            <textarea
              rows={3}
              name="description"
              placeholder="Edit the description"
              className="bg-[#F4F2FF] w-auto p-2 border-2 border-[#2B1887] rounded-lg"
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
            />
            <select
              className="appearance-none w-auto bg-[#7f68f0] text-white p-2 rounded-lg shadow-lg shadow-black/30 focus:outline-none focus:shadow-pink-500"
              value={editedCategory}
              onChange={handleCategory}
            >
              {options.map((option, index) => (
                <option key={index} value={option} className="focus:bg-white">
                  {option} Task
                </option>
              ))}
            </select>
            <button
              className="text-white bg-[#25c925] hover:bg-[#329932] rounded-md p-2"
              onClick={handleSaveEdit}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-3">
              {/* Custom CheckBox */}
              {isDone ? (
                <button
                  onClick={() => {
                    handleTaskDone();
                  }}
                  className="flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-xl text-[#25c925]"
                  />
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleTaskDone();
                  }}
                  className="flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    beatFade
                    className="text-xl text-orange-400"
                  />
                </button>
              )}

              <h3
                htmlFor="done"
                className={`md:text-xl font-bold ${
                  isDone ? "line-through" : ""
                }`}
              >
                {task.title}
              </h3>
              <button
                className={`text-pink-400 text-sm ${
                  isDetailsVisible ? "hidden" : "block"
                }`}
                onClick={toggleDetails}
              >
                Show Details
              </button>
              <button
                className={`text-pink-400 text-sm ${
                  !isDetailsVisible ? "hidden" : "block"
                }`}
                onClick={toggleDetails}
              >
                Hide Details
              </button>
            </div>
            {isDetailsVisible ? (
              <p className="mt-4 text-sm text-justify px-8">{task.desc}</p>
            ) : (
              <p></p>
            )}
          </div>
        )}
      </div>
      {!toggleEdit ? (
        <div className="flex flex-row items-center gap-1">
          <p
            className={`text-white text-xs p-2 ${
              isDone ? "bg-red-600" : "bg-[#7f68f0]"
            } rounded-lg`}
          >
            {task.category}
          </p>
          {isDone ? (
            <button
              className="text-white rounded-md p-2"
              onClick={() => {
                handleDelete(index);
              }}
            >
              <FontAwesomeIcon className="text-red-600" icon={faTrash} />
            </button>
          ) : (
            <button
              className="text-white rounded-md p-2"
              onClick={handleToggleEdit}
            >
              <FontAwesomeIcon className="text-yellow-600" icon={faPencil} />
            </button>
          )}
        </div>
      ) : (
        <></>
      )}
    </li>
  );
};

export default Todo;
