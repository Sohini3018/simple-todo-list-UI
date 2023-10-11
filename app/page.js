"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faClipboard } from "@fortawesome/free-solid-svg-icons";
import Todo from "./components/Todo";
import { maxTitle } from "./components/Todo";

const page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [addTask, setAddTask] = useState([]);

  const handleTitle = (e) => {
    const title_ = e.target.value;
    if (title_.length <= maxTitle) {
      setTitle(title_);
    }
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmitTask = () => {
    setAddTask([...addTask, { title: title, desc: desc }]);
    setTitle("");
    setDesc("");
  };

  const handleDelete = (i) => {
    const updatedTask = addTask.filter((_, index) => {
      return index !== i;
    });
    setAddTask(updatedTask);
  };

  const handleEdit = (index, editedTitle, editedDesc) => {
    const updatedTask = [...addTask];
    updatedTask[index] = { title: editedTitle, desc: editedDesc };
    setAddTask(updatedTask);
  }

  return (
    <main className="h-screen bg-orange-100 py-10 overflow-x-hidden">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center w-[80%] py-10 border-0 rounded-xl">
          <div className="flex flex-row gap-4 items-center mb-6">
            <p className="w-15 text-4xl text-[#2B1887] font-bold">Todo List</p>
            <FontAwesomeIcon icon={faClipboard} className="text-4xl text-[#2B1887]" />
          </div>

          <div className="flex justify-center items-center m-5 flex-col gap-3 md:flex-row w-[70vw] rounded-lg py-4">
            <input
              type="text"
              placeholder="Add the title"
              className={`bg-[#F4F2FF] w-64 md:w-auto p-3 border-2 rounded-lg ${title.length === maxTitle ? "text-red-500" : ""} focus:outline-none shadow-lg shadow-black/30 focus:shadow-pink-500`}
              value={title}
              onChange={handleTitle}
            />
            <input
              type="text"
              placeholder="Add some description"
              className="bg-[#F4F2FF] w-64 md:w-auto p-3 border-2 rounded-lg focus:outline-none shadow-lg shadow-black/30 focus:shadow-pink-500"
              value={desc}
              onChange={handleDesc}
            />

            <button
              className={`min-w-fit flex justify-between items-center gap-3 text-white ${title.length === 0 ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-700 "} shadow-lg shadow-black/30 rounded-md p-3 w-[7rem] mt-4 md:mt-0`}
              onClick={handleSubmitTask}
              disabled={title.length === 0 ? true : false}
            >
              <FontAwesomeIcon icon={faAdd} />
              Add Task
            </button>
          </div>

          {/* showTasks if there is at least one task available */}
          <div className="rounded-lg py-8 w-full md:w-auto md:px-6 md:bg-pink-400 mt-6">
            {addTask.length == 0 ? (
              <p className="text-center text-pink-500 md:text-white font-bold">Your Tasks will appear here...</p>
            ) : (
              <div>
                <h3 className="text-center text-xl text-pink-500 md:text-white font-bold mb-8">All Category Tasks</h3>
                <ul>
                  {addTask.map((task, i) => {
                    return <Todo task={task} index={i} handleDelete={handleDelete} handleEdit={handleEdit} />;
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
