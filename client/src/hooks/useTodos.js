import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function getTodosFromApi() {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const todos = await data.json();

      setTodos(todos);
    }

    if (accessToken) {
      getTodosFromApi();
    }
  }, [accessToken]);

  return [todos, setTodos];
}
