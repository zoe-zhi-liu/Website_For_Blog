import "../style/appLayout.css";

import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function AppLayout() {
  const { user, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <div className="title">
        <h1>🔥 AI Fusion 🔥</h1>
      </div>
      <div className="header">
        <nav className="menu">
          <ul className="menu-list">
            <li>
              <Link to="/app/" style={{ textDecoration: "none" }}>
                🏠Home
              </Link>
            </li>
            <li>
              <Link to="/app/profile" style={{ textDecoration: "none" }}>
                📔Profile
              </Link>
            </li>
            <li>
              <Link to="/app/todos" style={{ textDecoration: "none" }}>
                🍃Project
              </Link>
            </li>
            <li>
              <Link to="/app/debugger" style={{ textDecoration: "none" }}>
                🧑‍🏫Debugger
              </Link>
            </li>
            <li>
              <button
                className="exit-button"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                ⛔LogOut
              </button>
            </li>
          </ul>
        </nav>
        <div>Hola, 👋 {user.name} </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
