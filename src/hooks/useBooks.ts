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

export const useBooks = () => {
  const queryClient = useQueryClient();

  // Fetch books
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  // --- Mutation handlers ---
  const onError = (action: string) => (error: unknown) => {
    console.error(`Error during ${action}:`, error);
    showNotification({
      title: "Error",
      message: `Failed to ${action} book.`,
      color: "red",
      icon: React.createElement(IconX, { size: 18 }),
      autoClose: 3000,
    });
  };

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

  // --- Return API and mutation states ---

  return {
    books,
    isLoading,
    isError,
    addBook,
    updateBook: updateBookMutation,
    deleteBook,

    // Optional flags for UI feedback
    isAdding: addBook.isPending,
    isUpdating: updateBookMutation.isPending,
    isDeleting: deleteBook.isPending,
    addSuccess: addBook.isSuccess,
    updateSuccess: updateBookMutation.isSuccess,
    deleteSuccess: deleteBook.isSuccess,
  };
};
