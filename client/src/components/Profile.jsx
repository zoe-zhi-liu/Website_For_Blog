import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";
import useTodos from "../hooks/useTodos";
import { Link } from "react-router-dom";
import "../style/profile.css";

export default function Profile() {
  const { user } = useAuth0();
  const { accessToken } = useAuthToken();
  const [bio, setBio] = useState("");
  const [todos, setTodos] = useTodos();

  useEffect(() => {
    let fetchUser = async() => {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      let userData = await res.json()
      console.log(userData.bio);
      setBio(userData.bio)
    }
    fetchUser()
  }, []);

  let handleBioChange = (e) => {
    setBio(e.target.value);
  };

  let handleSave = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL}/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        bio,
      }),
    });
    const response = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const updatedUser = await response.json();
    console.log(updatedUser);
    setBio(updatedUser.bio);
  };

  return (
    <div className="container">
      <div>
        <p>Name: {user.name}</p>
      </div>
      <div>
        <img src={user.picture} width="70" alt="profile avatar" />
      </div>
      <div>
        <p>📧 Email: {user.email}</p>
      </div>
      <div>
        <p>📧 Bio: {bio}</p>
      </div>
      <div>
        <p>🔑 Auth0Id: {user.sub}</p>
      </div>
      <div>
        <p>✅ Email verified: {user.email_verified?.toString()}</p>
      </div>

      <h3>Change Your Bio:</h3>
      <div>
        <p>Bio:</p>
        <input type="text" value={bio} onChange={handleBioChange} />
      </div>
      <button onClick={handleSave}>Save</button>

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
