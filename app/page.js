"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faClipboard } from "@fortawesome/free-solid-svg-icons";
import Todo from "./components/Todo";
import { maxTitle, options } from "./components/Todo";

const completions = ["Incomplete", "Complete"];

const FilteredTodoIndices = (tasks, filter, complete) => {
  const filteredIndices = [];

  tasks.forEach((task, index) => {
    if (
      (complete === "All" || (complete === "Complete" && task.done) || (complete === "Incomplete" && !task.done)) &&
      (filter === "All" || task.category === filter)
    ) {
      filteredIndices.push(index);
    }
  });

  return filteredIndices;
};

const page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedCategory, setCategory] = useState(options[0]);
  const [filter, setFilter] = useState("All");
  const [complete, setComplete] = useState("All");

  const [addTask, setAddTask] = useState([]);

  const [filteredList, setFilteredList] = useState(() => {
    return FilteredTodoIndices(addTask, filter, complete);
  });

  const handleAddTask = () => {
    const updatedTasks = [...addTask, { title: title, desc: desc, category: selectedCategory, done: false }];
    setAddTask(updatedTasks);
    setTitle("");
    setDesc("");
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
    const filtered = FilteredTodoIndices(addTask, e.target.value, complete);
    setFilteredList(filtered);
  }

  const handleCompletions = (e) => {
    setComplete(e.target.value);
    const filtered = FilteredTodoIndices(addTask, filter, e.target.value);
    setFilteredList(filtered);
  }

  const handleTitle = (e) => {
    const title_ = e.target.value;
    if (title_.length <= maxTitle) {
      setTitle(title_);
    }
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleDelete = (i) => {
    const updatedTask = addTask.filter((_, index) => {
      return index !== i;
    });
    setAddTask(updatedTask);
    const filtered = FilteredTodoIndices(updatedTask, filter, complete);
    setFilteredList(filtered);
  };

  const handleEdit = (index, editedTitle, editedDesc, category, done) => {
    const updatedTask = [...addTask];
    updatedTask[index] = { title: editedTitle, desc: editedDesc, category: category, done: done };
    setAddTask(updatedTask);
    const filtered = FilteredTodoIndices(updatedTask, filter, complete);
    setFilteredList(filtered);
  }

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <main className="min-h-screen bg-orange-100 py-10 overflow-x-hidden">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center md:w-[85%] py-10 border-0 rounded-xl">
          <div className="flex flex-row gap-4 items-center mb-6">
            <p className="w-15 text-4xl text-[#2B1887] font-bold">Todo List</p>
            <FontAwesomeIcon icon={faClipboard} className="text-4xl text-[#2B1887]" />
          </div>

          <div className="flex justify-center items-center m-5 flex-col gap-3 xl:flex-row w-[70vw] rounded-lg py-4">
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
            <h2 className="md:hidden text-pink-500 font-bold text-lg mt-4">Select Task Type</h2>
            <select
              className="appearance-none w-auto bg-[#7f68f0] text-white px-6 py-3 pr-8 rounded-lg shadow-lg shadow-black/30 focus:outline-none focus:shadow-pink-500"
              value={selectedCategory}
              onChange={handleCategory}
            >
              {options.map((option, index) => (
                <option key={index} value={option} className="focus:bg-white">
                  {option} Task
                </option>
              ))}
            </select>

            <button
              className={`min-w-fit flex justify-between items-center gap-3 text-white ${title.length === 0 ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-700 "} shadow-lg shadow-black/30 rounded-md p-3 px-4 w-[7rem] mt-4 md:mt-0`}
              onClick={handleAddTask}
              disabled={title.length === 0 ? true : false}
            >
              <FontAwesomeIcon icon={faAdd} />
              Add Task
            </button>
          </div>

          {/* showTasks if there is at least one task available */}
          <div className="rounded-lg py-8 w-auto md:w-auto md:px-6 mx-3 bg-pink-400 mt-6 flex justify-center">
            {addTask.length == 0 ? (
              <p className="text-center text-pink-500 md:text-white font-bold px-24">Your Tasks will appear here...</p>
            ) : (
              <div className="w-[88%] md:w-full">
                <h3 className="text-center text-xl md:text-2xl text-white font-extrabold mb-14">{filter} Category Tasks</h3>
                <div className="flex flex-row justify-between items-center md:mx-8 my-8">
                  <select
                    className="appearance-none max-w-fit bg-white p-2 md:px-6 md:py-3 md:pr-8 rounded-lg shadow-lg shadow-black/30 focus:outline-none focus:shadow-pink-500 mr-4 md:mr-16"
                    value={filter}
                    onChange={handleFilter}
                  >
                    <option value={"All"}>
                      Filter Category
                    </option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    className="appearance-none max-w-fit bg-white p-2 md:px-6 md:py-3 md:pr-8 rounded-lg shadow-lg shadow-black/30 focus:outline-none focus:shadow-pink-500 ml-4 md:ml-16"
                    value={complete}
                    onChange={handleCompletions}
                  >
                    <option value={"All"}>
                      Filter Completion
                    </option>
                    {completions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {
                  filter === "All" && complete === "All" ?
                    <ul>
                      {addTask.map((task, i) => {
                        return <Todo task={task} key={i} index={i} handleDelete={handleDelete} handleEdit={handleEdit} />;
                      })}
                    </ul>
                    :
                    (filteredList.length != 0 ?
                      <ul>
                        {filteredList.map((index) => {
                          return <Todo task={addTask[index]} key={index} index={index} handleDelete={handleDelete} handleEdit={handleEdit} />;
                        })}
                      </ul>
                      :
                      <p className="text-center bg-orange-100 p-3 rounded-lg text-pink-500 font-bold my-8 mt-14 mx-8 md:mx-5">No {complete === "All" ? "" : complete} Task Found in {filter} Category !</p>
                    )
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
