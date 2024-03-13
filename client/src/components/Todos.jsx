import "../style/todos.css";

import { useState } from "react";
import useTodos from "../hooks/useTodos";
import { useAuthToken } from "../AuthTokenContext";
import { Link } from "react-router-dom";
import { Picsum } from "picsum-photos";

export default function Todos() {
  const [newItemText, setNewItemText] = useState("");
  const [todos, setTodos] = useTodos();
  const { accessToken } = useAuthToken();

  async function insertTodo(title) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: title,
      }),
    });
    if (data.ok) {
      const todo = await data.json();
      return todo;
    } else {
      return null;
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newItemText) return;

    const newTodo = await insertTodo(newItemText);
    if (newTodo) {
      setTodos([...todos, newTodo]);
      setNewItemText("");
    }
  };

  let handleDeleteItem = async (itemId) => {
    let res = await fetch(`${process.env.REACT_APP_API_URL}/todos/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.ok) {
      setTodos(todos.filter((item) => item.id !== itemId));
    } else {
      console.log("failed to fetch data");
    }
  };

  return (
    <div className="todo-list container">
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="todo-form"
        autoComplete="off"
      >
        <input
          type="text"
          name="item"
          id="item"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
        />
        <button type="submit">+ Add Project</button>
      </form>

      <ul className="list">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="todo-item">
              <input
                onChange={(e) => console.log(e.target)}
                value={todo.id}
                type="checkbox"
                checked={todo.completed}
              />
              <Link to={`/app/details/${todo.id}`} className="link">
                <li className="itemName">{todo.title}</li>
              </Link>
              <button
                aria-label={`Remove ${todo.title}`}
                value={todo.id}
                onClick={() => handleDeleteItem(todo.id)}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
      <img
        src={Picsum.url()}
        alt=""
        width="400"
        height="400"
        className="responsive-img"
      />
    </div>
  );
}
