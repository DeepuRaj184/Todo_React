
import React, { useEffect, useRef } from "react";
import Classes from "./AddTask.module.css";


const AddTask = (props) => {
  const title = useRef();
  useEffect(() => {
    title.current.value = props.isEdit.edit ? props.isEdit.task.title : "";
  }, [props.isEdit]);
  return (

    <div className={Classes.taskContainer}>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.addtask(title.current.value);
          title.current.value = "";
        }}
      >
        <div className="inside-box">
          <label>Enter the Todo  </label>
          <br />
          <input ref={title} type="text" required />
        </div>
        <div>

          {props.isEdit.edit ? (
            <button
              type="button"
              onClick={() => {
                const task = props.isEdit.task;
                task.title = title.current.value;
                props.updateHandler(task, false);
              }}
            >
              Save
            </button>
          ) : (
            <button type="submit">ADD TODO</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTask;