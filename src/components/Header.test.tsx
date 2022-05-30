import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

test("signs out on click", async () => {
  render(<Header />);

  fireEvent.click(screen.getByText("Sign Out"));
});
