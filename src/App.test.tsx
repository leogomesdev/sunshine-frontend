import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders register now link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Register now/i);
  expect(linkElement).toBeInTheDocument();
});
