import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import BookDetailsModal from "../BookDetailsModal";
import { vi } from "vitest";

const renderWithProvider = (ui: React.ReactNode) =>
  render(<MantineProvider>{ui}</MantineProvider>);

test("renders book details when modal is open", () => {
  renderWithProvider(
    <BookDetailsModal
      opened={true}
      onClose={vi.fn()}
      book={{
        id: 1,
        title: "Test",
        author: "Author",
        year: 2023,
        description: "Sample desc",
      }}
    />
  );

  expect(screen.getByText("Book Details")).toBeInTheDocument();
  expect(screen.getByText("Test")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Author", level: 5 })
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      (_, el) => el?.tagName === "P" && el.textContent === "Author"
    )
  ).toBeInTheDocument();

  expect(screen.getByText("2023")).toBeInTheDocument();
  expect(screen.getByText("Sample desc")).toBeInTheDocument();
});
