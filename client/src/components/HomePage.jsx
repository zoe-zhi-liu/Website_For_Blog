import React, { useEffect, useState } from "react";
import { useAuthToken } from "../AuthTokenContext";
import useTodos from "../hooks/useTodos";
import { Picsum } from "picsum-photos";
import { Link } from "react-router-dom";
import "../style/homePage.css";

export default function HomePage() {
  const [todos, setTodos] = useTodos();
  const { accessToken } = useAuthToken();

  useEffect(() => {
    let fetchTodos = async () => {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/todos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        let todosData = await res.json();
        console.log(todosData);
        setTodos(todosData);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="home">
      <h1>
        Unlock the Power of AI & ML Projects - Discover, Collaborate, Succeed
      </h1>
      <img src={Picsum.url()} alt="" width="400" height="400"
      className="responsive-img" />
      <p>
        Are you searching for the perfect AI and Machine Learning project? Look
        no further! Our platform offers a place for enthusiasts like you to
        connect, collaborate, and embark on exciting projects. Whether you're a
        beginner or an experienced professional, our responsive and accessible
        web presence ensures that you can easily explore and join projects,
        right from your phone. Don't miss out on this opportunity to showcase
        your skills and find your dream AI and Machine Learning project. How can
        we assist you today?
      </p>

      <h2>Your AI Project List:</h2>
      <ul>
        {todos.map((todo) => (
          <Link to={`/app/details/${todo.id}`} className="link">
            <li className="itemName">{todo.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
