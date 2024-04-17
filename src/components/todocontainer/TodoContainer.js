import React, { useEffect, useState, useMemo } from "react";

import {
  addTaskHandler,
  deleteTask,
  fetchTodo,
  updateTask,
} from "../../api/index.js";
import AddTask from "../adding_task/AddTask.jsx";
import ShowTask from "../showing_task/ShowTask.jsx";
import Classes from "./Todocontainer.module.css";


const TodoContainer = () => {

  const [isLoading, setisLoading] = useState(true);

  const [Todo, setTodo] = useState([]);

  const [isEdit, setisEdit] = useState({
    edit: false,
    task: {},
  });

  const userId = 1;

  async function completed(task) {
    const index = Todo.findIndex((elm) => {
      return elm.id === task.id;
    });
    setTodo((prev) => {
      prev[index].completed = true;
      return [...prev];
    });
  }

  async function updateHandler(task, requested) {
    if (requested) {
      setisEdit({
        edit: true,
        task,
      });
      return;
    }
    const data = await updateTask(task);
    if (data.success) {
        console.log("true")
    } else {
        console.log("false")
    }
    setisEdit({
      edit: false,
      task: {},
    });
  }

  async function deleteHandler(id) {
    const result = await deleteTask(id);
    if (result.success) {
      const todo = Todo.filter((data) => {
        return data.id !== id;
      });
      setTodo(todo);
    } else {
        console.log("Delete failed")
    }
  }

  async function addData(title) {
    const data = await addTaskHandler(title, userId);
    if (data.success) {
      setTodo([data.data, ...Todo]);
    } else {
        console.log("Add Todo failed")
    }
  }

  useEffect(() => {
    async function post() {
      const data = await fetchTodo();
      if (data.success) {
        setisLoading(false);
        setTodo(data.data);
      } else {
        setisLoading(false);
      }
    }

    post();
  }, []);

  return (

    <div className={Classes.container}>

      <h1>TODO LIST APP</h1>

      <AddTask
        addtask={addData}
        isEdit={isEdit}
        updateHandler={updateHandler}
      />
        <ShowTask
          todo={Todo}
          delete={deleteHandler}
          completed={completed}
          updateHandler={updateHandler}
        />
    </div>
  );
};

export default TodoContainer;