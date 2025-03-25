import { render, screen } from "@testing-library/react";
import BugItem from "../components/BugItem";

const mockBug = {
  id: "1",
  title: "Sample Bug",
  description: "This is a test bug",
  status: "Open",
};

test("renders bug title and description", () => {
  render(<BugItem bug={mockBug} />);
  
  expect(screen.getByText(/Sample Bug/i)).toBeInTheDocument();
  expect(screen.getByText(/This is a test bug/i)).toBeInTheDocument();
});

test("displays bug status correctly", () => {
  render(<BugItem bug={mockBug} />);
  
  expect(screen.getByText(/Open/i)).toBeInTheDocument();
});
