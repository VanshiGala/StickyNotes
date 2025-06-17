import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


function Work() {
  let [todos, setTodos] = useState([{ task: "sample Task", id: uuidv4(), isDone: false },]);
  let [newTodo, setNewTodo] = useState("");

  let addNewtask = () => {
    setTodos((prevTodos) => {
      return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
    });

    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
  };

  let markAsDone = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      });
    });
  };
  return (
    <div className="p-4 max-w-md mx-auto text-black">
      <h1 className="font-bold mt-4 text-4xl ">Work</h1>
      <br></br>
      <div>
        <input
        placeholder="add a task"
        value={newTodo}
        onChange={updateTodoValue}
      ></input> <span></span>
      <button onClick={addNewtask}> + </button>
      <br></br>
      <br></br>

      <hr></hr>
      <h4>Tasks Todo</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={todo.isDone ? { textDecorationLine: "line-through" } : {}}
            >
              {todo.task}
            </span>
            &nbsp;&nbsp;&nbsp;
            <button onClick={() => deleteTodo(todo.id)}>delete</button>{" "}
            <span></span>
            <button onClick={() => markAsDone(todo.id)}>Mark As Done</button>
          </li>
        ))}
      </ul>
      </div>
      
      
    </div>
  );
}

export default Work;