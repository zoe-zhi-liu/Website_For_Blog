import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";

export default function AuthDebugger() {
  const { user } = useAuth0();
  const { accessToken } = useAuthToken();

  return (
    <div>
      <div>
        <h3>Access Token:</h3>
        <div>{JSON.stringify(accessToken, null, 2)}</div>
      </div>
      <div>
        <h3>User Info</h3>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}