import axios from "axios";
import type { Book } from "../types/Book";

const API_URL = "http://localhost:4000/books";

// GET all books
export const fetchBooks = async (): Promise<Book[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

// POST new book
export const createBook = async (book: Book): Promise<Book> => {
  const res = await axios.post(API_URL, book);
  return res.data;
};

// PUT update book
export const updateBook = async (id: number, book: Book): Promise<Book> => {
  const res = await axios.put(`${API_URL}/${id}`, book);
  return res.data;
};

// DELETE book
export const deleteBook = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
