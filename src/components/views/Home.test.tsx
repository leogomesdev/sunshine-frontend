import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("renders text If you want to see the sunshine", () => {
  render(<Home />);
  const linkElement = screen.getByText(
    /^"If you want to see the sunshine, you have to weather the storm"$/i
  );
  expect(linkElement).toBeInTheDocument();
});
