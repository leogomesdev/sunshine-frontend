import { render, screen } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

import Register from "./Register";

describe("Register", () => {
  it("renders link to allow return to login page", () => {
    render(<Register />);
    const linkElement = screen.getByText(/^Already have an account\? Login$/i);
    expect(linkElement).toBeInTheDocument();
  });
});
