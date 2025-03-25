import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BugForm from "../components/BugForm";

describe("BugForm Component", () => {
  const mockOnSubmit = jest.fn();
  const initialBug = { title: "Test Bug", description: "Bug description", status: "open" };

  it("renders form with inputs", () => {
    render(<BugForm onSubmit={mockOnSubmit} bug={null} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it("allows user to input values", () => {
    render(<BugForm onSubmit={mockOnSubmit} bug={null} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);

    fireEvent.change(titleInput, { target: { value: "New Bug" } });
    fireEvent.change(descInput, { target: { value: "This is a new bug" } });

    expect(titleInput.value).toBe("New Bug");
    expect(descInput.value).toBe("This is a new bug");
  });

  it("submits form with entered values", () => {
    render(<BugForm onSubmit={mockOnSubmit} bug={null} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Bug Test" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Bug description" } });
    fireEvent.submit(screen.getByRole("form"));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("pre-fills inputs when editing a bug", () => {
    render(<BugForm onSubmit={mockOnSubmit} bug={initialBug} />);

    expect(screen.getByLabelText(/title/i).value).toBe("Test Bug");
    expect(screen.getByLabelText(/description/i).value).toBe("Bug description");
  });
});
