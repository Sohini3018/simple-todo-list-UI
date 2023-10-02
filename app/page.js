"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faClipboard } from "@fortawesome/free-solid-svg-icons";
import Todo from "./components/Todo";

const page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [addTask, setAddTask] = useState([]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmitTask = () => {
    {
      if (title !=="") {
        setAddTask([...addTask, { title: title, desc: desc }]);
        setTitle("");
        setDesc("");
      } else alert("Please enter a task");
    }
  };

  const handleDelete = (i) => {
    const updatedTask = addTask.filter((_, index) => {
      return index !== i;
    });
    setAddTask(updatedTask);
  };

  return (
    <div className="flex justify-center my-10">
      <div className="bg-[#D5CCFF] flex flex-col justify-center items-center w-3/4 p-10 border-0 rounded-xl">
        <p className="w-15 text-2xl text-[#2B1887] font-bold">
          Todo List <FontAwesomeIcon icon={faClipboard} />
        </p>
        <div className="flex justify-center items-center m-5 flex-col gap-3 md:flex-row ">
          <input
            type="text"
            placeholder="Add the title"
            className="bg-[#F4F2FF] p-3 border-2 border-gray-400 rounded-lg"
            value={title}
            onChange={handleTitle}
          />
          <input
            type="text"
            placeholder="Add some description"
            className="bg-[#F4F2FF] p-3 border-2 border-gray-400 rounded-lg"
            value={desc}
            onChange={handleDesc}
          />
          <button
            className="text-white bg-pink-400 hover:bg-pink-900 rounded-md p-2"
            onClick={handleSubmitTask}
          >
            Add Task
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </div>
        {/* showTasks if there is atleast one task available */}
        {addTask.length == 0 ? (
          "No tasks available"
        ) : (
          <div>
            {addTask.map((task, i) => {
              return <Todo task={task} index={i} handleDelete={handleDelete} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
