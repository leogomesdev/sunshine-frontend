import { render, screen } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

import Login from "./Login";

test("renders link to register page", () => {
  render(<Login />);
  const linkElement = screen.getByText(
    /^Don't have an account yet\? Register now$/i
  );
  expect(linkElement).toBeInTheDocument();
});
