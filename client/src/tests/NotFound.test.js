import { render, screen } from "@testing-library/react";
import NotFound from "../components/NotFound";

test("renders Not Found copy", () => {
  // if I render not found component, expect text in component
  render(<NotFound />);
  expect(screen.getByText("Not Found page")).toBeInTheDocument();
});
