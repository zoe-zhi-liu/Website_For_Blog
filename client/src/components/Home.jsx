import "../style/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import React, { useEffect, useState } from "react";
import useTodos from "../hooks/useTodos";
import { useAuthToken } from "../AuthTokenContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { accessToken } = useAuthToken();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const signUp = () => loginWithRedirect({ screen_hint: "signup" });
  const [todos, setTodos] = useTodos();
  const [publicTodos, setPublicTodos] = useState([]);

  useEffect(() => {
    const fetchPublicTodos = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/public/todos`
      );
      const todos = await response.json();
      setPublicTodos(todos);
    };

    fetchPublicTodos();
  }, []);

  return (
    <div className="home">
      <h1>🔥 AI Fusion 🔥</h1>

      <img
        src="https://www.gqrgm.com/wp-content/uploads/2018/10/How-To-Become-A-Machine-Learning-Engineer.jpg"
        alt=""
        className="responsive-image"
      />

      <div>
        {!isAuthenticated ? (
          <Button variant="primary" onClick={loginWithRedirect}>
            Login
          </Button>
        ) : (
          <Button variant="primary" onClick={() => navigate("/app")}>
            Enter App
          </Button>
        )}
      </div>
      <div>
        <Button variant="secondary" onClick={signUp}>
          Create Account
        </Button>
      </div>

      {!isAuthenticated ? (
        <div>
          <h3>🔥Most Recent Projects</h3>
          <ul>
            {publicTodos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>🧑‍🏫Your AI Project List:</h2>
          <ul>
            {todos.map((todo) => (
              <li className="itemName">{todo.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
