import {
  Button,
  Group,
  Text,
  Paper,
  Stack,
  Card,
  Collapse,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState, Fragment } from "react";
import type { Book } from "../types/Book";
import ToggleDescription from "./ToggleDescription";
import "../styles/BookTable.css";

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
  onView: (book: Book) => void;
}

const BookTable = ({ books, onEdit, onDelete, onView }: BookTableProps) => {
  const [openDescriptions, setOpenDescriptions] = useState<
    Record<number, boolean>
  >({});
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <Stack gap="sm" mt="md">
        {books.map((book) => (
          <Card
            key={book.id}
            shadow="sm"
            radius="md"
            withBorder
            p="md"
            style={{ width: "25rem" }}
          >
            <Text fw={600} size="md">
              {book.title}
            </Text>
            <Text size="sm" c="dimmed" mb="xs">
              {book.author} • {book.year}
            </Text>
            <ToggleDescription description={book.description} />
            <Group justify="center" gap="xs" wrap="wrap" mt="md">
              <Button size="xs" onClick={() => onView(book)}>
                View
              </Button>
              <Button size="xs" onClick={() => onEdit(book)}>
                Edit
              </Button>
              <Button size="xs" color="red" onClick={() => onDelete(book.id!)}>
                Delete
              </Button>
            </Group>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <Paper withBorder shadow="md" radius="md" p="md" w="100%">
      <div className="table">
        <div className="table-head">
          <div>Title</div>
          <div>Author</div>
          <div style={{ textAlign: "center" }}>Year</div>
          <div style={{ textAlign: "center" }}>Actions</div>
        </div>

        {books.map((book) => {
          const isOpen = openDescriptions[book.id!] || false;

          return (
            <Fragment key={book.id}>
              <div className="table-row">
                <div>
                  <Text size="sm" fw={500}>
                    {book.title}
                  </Text>
                  <Text
                    size="xs"
                    c="blue"
                    mt={4}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() =>
                      setOpenDescriptions((prev) => ({
                        ...prev,
                        [book.id!]: !prev[book.id!],
                      }))
                    }
                  >
                    {isOpen ? "Hide description" : "Show description"}
                  </Text>
                </div>
                <div>{book.author}</div>
                <div style={{ textAlign: "center" }}>{book.year}</div>
                <div style={{ textAlign: "center" }}>
                  <Group justify="center" gap="xs">
                    <Button size="xs" onClick={() => onView(book)}>
                      View
                    </Button>
                    <Button size="xs" onClick={() => onEdit(book)}>
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => onDelete(book.id!)}
                    >
                      Delete
                    </Button>
                  </Group>
                </div>
              </div>

              <Collapse in={isOpen}>
                <div className="description-collapse">
                  <Text size="xs" c="dimmed">
                    {book.description || "No description."}
                  </Text>
                </div>
              </Collapse>
            </Fragment>
          );
        })}
      </div>
    </Paper>
  );
};

export default BookTable;
