import { render, screen } from "@testing-library/react";
import HomePage from "../components/HomePage"

// mock response from API
jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  Auth0Provider: ({ children }) => children,
  useAuth0: () => {
    return {
      isLoading: false,
      user: { sub: "foobar" },
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
    };
  },
}));

jest.mock("../AuthTokenContext", () => ({
  useAuthToken: () => {
    return { accessToken: "123" };
  },
}));

test("renders Not Found copy", () => {
  render(<HomePage />);
  expect(screen.getByText("Unlock the Power of AI & ML Projects - Discover, Collaborate, Succeed")).toBeInTheDocument();
});
