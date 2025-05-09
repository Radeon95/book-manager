import { useState } from "react";
import {
  Button,
  Container,
  Title,
  TextInput,
  Space,
  Group,
  Loader,
  Alert,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { Book } from "../types/Book";
import BookTable from "../components/BookTable";
import BookForm from "../components/BookForm";
import BookDetailsModal from "../components/BookDetailsModal";
import { useBooks } from "../hooks/useBooks";
import styles from "../styles/BookManager.module.css";

const BookManager = () => {
  const { books, addBook, updateBook, deleteBook, isLoading, isError } =
    useBooks();

  const [search, setSearch] = useState("");
  const [formOpened, setFormOpened] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [viewBook, setViewBook] = useState<Book | null>(null); // For BookDetailsModal

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Container
          size="lg"
          p="xl"
          style={{
            background: "white",
            borderRadius: 12,
            boxShadow: "0 0 20px rgba(0,0,0,0.05)",
          }}
        >
          <Group justify="center" mt="xl">
            <Loader size="lg" />
          </Group>
        </Container>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.wrapper}>
        <Container size="lg" py="md">
          <Alert title="Error" color="red" mt="xl">
            Failed to load books. Please try again later.
          </Alert>
        </Container>
      </div>
    );
  }

  const handleAddClick = () => {
    setEditBook(null);
    setFormOpened(true);
  };

  const handleEdit = (book: Book) => {
    setEditBook(book);
    setFormOpened(true);
  };

  const handleDelete = (id: number) => {
    deleteBook.mutate(id);
  };

  const handleView = (book: Book) => {
    setViewBook(book);
  };

  const filteredBooks =
    books?.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div className={styles.wrapper}>
      <Container
        size="lg"
        py="xl"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "960px",
        }}
      >
        <Title order={2} mb="md">
          📚 Book Manager
        </Title>
        <Group w="100%" mb="md" justify="space-between" align="center">
          <TextInput
            placeholder="Search by title"
            style={{ flex: 1, marginRight: 10 }}
            rightSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Button
            size="md"
            radius="md"
            style={{ whiteSpace: "nowrap" }}
            onClick={handleAddClick}
          >
            Add Book
          </Button>
        </Group>
        <BookTable
          books={filteredBooks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
        <BookForm
          opened={formOpened}
          onClose={() => setFormOpened(false)}
          initialValues={editBook}
          onSubmit={(book) => {
            if (editBook) {
              updateBook.mutate({ id: editBook.id!, data: book });
            } else {
              addBook.mutate(book);
            }
          }}
        />

        <BookDetailsModal
          opened={!!viewBook}
          book={viewBook}
          onClose={() => setViewBook(null)}
        />
        <Space h="xl" />
      </Container>
    </div>
  );
};

export default BookManager;
