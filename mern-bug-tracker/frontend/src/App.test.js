import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import * as api from "../api/api"; // Mock API module

jest.mock("../api/api"); // Mock the API

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Bug Tracker title", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Bug Tracker/i)).toBeInTheDocument();
  });

  test("fetches and displays bugs", async () => {
    const mockBugs = [
      { _id: "1", title: "Test Bug 1", status: "Open" },
      { _id: "2", title: "Test Bug 2", status: "Resolved" },
    ];
    
    api.getBugs.mockResolvedValue(mockBugs);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Wait for bug list to appear
    await waitFor(() => {
      expect(screen.getByText("Test Bug 1")).toBeInTheDocument();
     });
  });

  test("shows error message when API fails", async () => {
    api.getBugs.mockRejectedValue(new Error("Failed to fetch"));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error fetching bugs/i)).toBeInTheDocument();
    });
  });
});
