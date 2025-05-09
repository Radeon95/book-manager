import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconTrash, IconEdit, IconX } from "@tabler/icons-react";
import type { Book } from "../types/Book";
import {
  fetchBooks,
  createBook,
  updateBook,
  deleteBook as deleteBookApi,
} from "../api/booksApi";
import React from "react";

// Reusable logging helper
const logError = (error: unknown, context: string) => {
  console.error(`Error in ${context}:`, error);
  // Integrate with Sentry, LogRocket, etc. here if desired
};

// Reusable error handler
const onError = (action: string) => (error: Error) => {
  const message = error.message || "An unexpected error occurred.";
  showNotification({
    title: "Error",
    message: `Failed to ${action} book: ${message}`,
    color: "red",
    icon: React.createElement(IconX, { size: 18 }),
    autoClose: 3000,
  });
  logError(error, action);
};

export const useBooks = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Book[], Error, Book[], ["books"]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
    retry: 1, // Optional: disables infinite retry
    gcTime: 0, // Optional: disables cache for demo apps
    throwOnError: false, // Optional: explicitly suppress throwing
    // ✅ Temporarily remove `onError` from here
  });

  const { data: books, isLoading, isError, error } = query;

  React.useEffect(() => {
    if (isError && error) {
      onError("fetch")(error);
    }
  }, [isError, error]);

  const addBook = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      showNotification({
        title: "Success",
        message: "Book added!",
        color: "green",
        icon: React.createElement(IconCheck, { size: 18 }),
        autoClose: 3000,
      });
    },
    onError: onError("add"),
  });

  const updateBookMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Book }) =>
      updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      showNotification({
        title: "Updated",
        message: "Book updated successfully.",
        color: "blue",
        icon: React.createElement(IconEdit, { size: 18 }),
        autoClose: 3000,
      });
    },
    onError: onError("update"),
  });

  const deleteBook = useMutation({
    mutationFn: deleteBookApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      showNotification({
        title: "Deleted",
        message: "Book deleted.",
        color: "red",
        icon: React.createElement(IconTrash, { size: 18 }),
        autoClose: 3000,
      });
    },
    onError: onError("delete"),
  });

  return {
    books,
    isLoading,
    isError,
    addBook,
    updateBook: updateBookMutation,
    deleteBook,
    isAdding: addBook.isPending,
    isUpdating: updateBookMutation.isPending,
    isDeleting: deleteBook.isPending,
  };
};
