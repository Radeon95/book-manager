import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import React from "react";
import BookManager from "../BookManager";
import * as api from "../../api/booksApi";
import { MantineProvider } from "@mantine/core";

const book = {
  id: 1,
  title: "Book 1",
  author: "Author A",
  year: 2023,
  description: "A description",
};

export const createWrapper = () => {
  const client = new QueryClient();

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>
      <MantineProvider theme={{}}>{children}</MantineProvider>
    </QueryClientProvider>
  );
};
describe("BookManager integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders books and handles view button click", async () => {
    vi.spyOn(api, "fetchBooks").mockResolvedValue([book]);
    render(<BookManager />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Book 1")).toBeInTheDocument();
    });

    const viewButton = screen.getByRole("button", { name: /view/i });
    fireEvent.click(viewButton);

    await waitFor(() => {
      expect(screen.getByText("Book Details")).toBeInTheDocument();
    });
  });

  test("opens add book modal", async () => {
    vi.spyOn(api, "fetchBooks").mockResolvedValue([]);
    render(<BookManager />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    const addButton = screen.getByRole("button", { name: /add book/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    });
  });
});
