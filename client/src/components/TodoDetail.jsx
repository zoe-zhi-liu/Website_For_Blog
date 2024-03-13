import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthToken } from "../AuthTokenContext";
import { Link } from "react-router-dom";
import "../style/todoDetail.css";

export default function TodoDetail() {
  let [todo, setTodo] = useState(null);
  let { todoId } = useParams();
  let [commentText, setCommentText] = useState("")
  let [comments, setComments] = useState([])
  let { accessToken } = useAuthToken();

  let fetchTodoDetail = async () => {
    let res = await fetch(
      `${process.env.REACT_APP_API_URL}/todos/${todoId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.ok) {
      console.log("fetch detail success");
      let todoData = await res.json();
      setTodo(todoData);
    } 
  };

  let fetchComments = async () => {
    let res = await fetch(
      `${process.env.REACT_APP_API_URL}/todos/${todoId}/comments`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      let commentsData = await res.json();
      console.log(commentsData);
      setComments(commentsData)
    } else {
      console.log("fetch comments failed");
    }
  };

  useEffect(() => {
    fetchTodoDetail();
    fetchComments()
  }, [todoId, accessToken]);

  if (!todo) {
    return <div>Loading</div>;
  }

  let handleCommentSubmit = async() => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/todos/${todoId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ text: commentText }),
      }
    );

    if (res.ok) {
      console.log("success");
      fetchTodoDetail()
      fetchComments();
      setCommentText("")
    } else{
      console.log("submit failed");
    }
  }

  return (
    <div className="container">
      <h2>Project Details</h2>
      <p>Title: {todo.title}</p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
      <h3>Comments</h3>
      {comments.map((comment) => (
      <p key={comment.id}>{comment.text}</p>
    ))}

      <h3>Add New Comments</h3>
      <input 
        type="text" 
        value={commentText} 
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button onClick={handleCommentSubmit}>Submit</button>

      <br></br>
      <Link to={`/app/todos`}>
        <span className="itemName">Back</span>
      </Link>
    </div>
  );
}
