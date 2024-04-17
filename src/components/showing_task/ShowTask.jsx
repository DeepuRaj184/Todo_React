
import React from "react";


import Class from "./ShowTask.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


const ShowTask = (props) => {
  return (
    <div className={Class.taskBox}>

      {props.todo.map((post) => {
        return (
          <div key={post.id} className={Class.task}>
            <h5>{post.title}</h5>
            <div className={Class.icons}>
              <i class="fa-solid fa-paragraph" onClick={() => {
                  props.updateHandler(post, true);
                }}></i>
              <i className="fa-solid fa-trash-can" onClick={() => {
                  props.delete(post.id);
                }}></i>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default ShowTask;