import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import BookForm from "../BookForm";
import { vi } from "vitest";

const renderWithMantine = (ui: React.ReactNode) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

test("submits form with valid data", () => {
  const mockSubmit = vi.fn();
  renderWithMantine(
    <BookForm opened={true} onClose={() => {}} onSubmit={mockSubmit} />
  );

  fireEvent.change(screen.getByLabelText(/title/i), {
    target: { value: "Test Book" },
  });
  fireEvent.change(screen.getByLabelText(/author/i), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText(/year/i), {
    target: { value: "2023" },
  });

  fireEvent.click(screen.getByRole("button", { name: /add/i }));

  expect(mockSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      title: "Test Book",
      author: "John Doe",
      year: 2023,
    })
  );
});
