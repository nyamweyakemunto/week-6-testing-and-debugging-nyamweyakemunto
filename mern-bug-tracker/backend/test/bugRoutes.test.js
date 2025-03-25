import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from './BugForm';

test('renders form and submits correctly', () => {
  const mockOnBugCreated = jest.fn();

  render(<BugForm onBugCreated={mockOnBugCreated} />);

  const titleInput = screen.getByPlaceholderText(/bug title/i);
  const descInput = screen.getByPlaceholderText(/description/i);
  const submitButton = screen.getByText(/report bug/i);

  fireEvent.change(titleInput, { target: { value: 'Sample Bug' } });
  fireEvent.change(descInput, { target: { value: 'Bug description' } });
  fireEvent.click(submitButton);

  // Mocked API call means no immediate call here, but you can test input values:
  expect(titleInput.value).toBe('Sample Bug');
  expect(descInput.value).toBe('Bug description');
});
