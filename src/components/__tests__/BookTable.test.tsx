import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import BookTable from "../BookTable";
import { vi } from "vitest";

const books = [
  {
    id: 1,
    title: "Book A",
    author: "Author A",
    year: 2020,
    description: "Desc A",
  },
];

test("renders book rows and buttons", () => {
  const onEdit = vi.fn();
  const onDelete = vi.fn();
  const onView = vi.fn();

  render(
    <MantineProvider>
      <BookTable
        books={books}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
      />
    </MantineProvider>
  );

  expect(screen.getByText("Book A")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Edit"));
  expect(onEdit).toHaveBeenCalled();
  fireEvent.click(screen.getByText("Delete"));
  expect(onDelete).toHaveBeenCalled();
});
