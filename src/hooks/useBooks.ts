import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { showNotification } from "@mantine/notifications";
import type { Book } from "../types/Book";
import {
  fetchBooks,
  createBook,
  updateBook,
  deleteBook as deleteBookApi,
} from "../api/booksApi";
import { IconCheck, IconTrash, IconEdit } from "@tabler/icons-react";

export const useBooks = () => {
  const queryClient = useQueryClient();

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

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
  });

  return {
    books,
    isLoading,
    isError,
    addBook,
    updateBook: updateBookMutation,
    deleteBook,
  };
};
