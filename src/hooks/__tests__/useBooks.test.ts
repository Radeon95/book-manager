import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBooks } from "../useBooks";
import * as api from "../../api/booksApi";
import { vi } from "vitest";
import React from "react"; // Required for JSX return

export const createWrapper = () => {
  const client = new QueryClient();

  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client }, children);
};

describe("useBooks", () => {
  const book = {
    id: 1,
    title: "Book 1",
    author: "A",
    year: 2023,
    description: "Desc",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("fetches books", async () => {
    vi.spyOn(api, "fetchBooks").mockResolvedValue([book]);
    const { result } = renderHook(() => useBooks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.books).toHaveLength(1);
      expect(result.current.books?.[0].title).toBe("Book 1");
    });
  });

  test("adds a book", async () => {
    vi.spyOn(api, "createBook").mockResolvedValue(book);
    vi.spyOn(api, "fetchBooks").mockResolvedValue([book]);
    const { result } = renderHook(() => useBooks(), {
      wrapper: createWrapper(),
    });

    await result.current.addBook.mutateAsync(book);
    expect(api.createBook).toHaveBeenCalledWith(book);
  });

  test("updates a book", async () => {
    const updated = { ...book, title: "Updated" };
    vi.spyOn(api, "updateBook").mockResolvedValue(updated);
    vi.spyOn(api, "fetchBooks").mockResolvedValue([updated]);
    const { result } = renderHook(() => useBooks(), {
      wrapper: createWrapper(),
    });

    await result.current.updateBook.mutateAsync({ id: 1, data: updated });
    expect(api.updateBook).toHaveBeenCalledWith(1, updated);
  });

  test("deletes a book", async () => {
    vi.spyOn(api, "deleteBook").mockResolvedValue(undefined);
    vi.spyOn(api, "fetchBooks").mockResolvedValue([]);
    const { result } = renderHook(() => useBooks(), {
      wrapper: createWrapper(),
    });

    await result.current.deleteBook.mutateAsync(1);
    expect(api.deleteBook).toHaveBeenCalledWith(1);
  });
});
