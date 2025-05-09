import { Table, Button, Group, Text, Paper, Card, Stack } from "@mantine/core";
import type { Book } from "../types/Book";
import { useMediaQuery } from "@mantine/hooks";
import { Collapse } from "@mantine/core";
import { useState } from "react";

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
    // Mobile layout
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

            <Group
              justify="flex-start"
              gap="xs"
              wrap="wrap"
              style={{ justifyContent: "center", marginTop: "20px" }}
            >
              <Button size="xs" variant="light" onClick={() => onView(book)}>
                View
              </Button>
              <Button size="xs" variant="outline" onClick={() => onEdit(book)}>
                Edit
              </Button>
              <Button
                size="xs"
                color="red"
                onClick={() => book.id && onDelete(book.id)}
              >
                Delete
              </Button>
            </Group>
          </Card>
        ))}
      </Stack>
    );
  }

  // Desktop layout
  return (
    <Paper withBorder shadow="md" radius="md" p="md" w="100%">
      <Table
        striped
        highlightOnHover
        verticalSpacing="md"
        horizontalSpacing="xl"
      >
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Title</th>
            <th style={{ textAlign: "left" }}>Author</th>
            <th style={{ textAlign: "center" }}>Year</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.flatMap((book) => {
              const isOpen = openDescriptions[book.id!] || false;

              return [
                <tr key={book.id}>
                  <td style={{ textAlign: "left" }}>
                    <Text size="sm" fw={500}>
                      {book.title}
                    </Text>
                    <Text
                      size="xs"
                      c="blue"
                      mt={4}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() =>
                        setOpenDescriptions((prev) => ({
                          ...prev,
                          [book.id!]: !prev[book.id!],
                        }))
                      }
                    >
                      {isOpen ? "Hide description" : "Show description"}
                    </Text>
                  </td>
                  <td style={{ textAlign: "left" }}>{book.author}</td>
                  <td style={{ textAlign: "center" }}>{book.year}</td>
                  <td style={{ textAlign: "center" }}>
                    <Group gap="xs" justify="center" wrap="wrap">
                      <Button
                        size="xs"
                        radius="md"
                        variant="light"
                        color="blue"
                        onClick={() => onView(book)}
                      >
                        View
                      </Button>
                      <Button
                        size="xs"
                        radius="md"
                        variant="outline"
                        color="blue"
                        onClick={() => onEdit(book)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        radius="md"
                        color="red"
                        onClick={() => book.id && onDelete(book.id)}
                      >
                        Delete
                      </Button>
                    </Group>
                  </td>
                </tr>,

                isOpen && (
                  <tr key={`${book.id}-description`}>
                    <td colSpan={4}>
                      <Collapse in={true}>
                        <Text size="xs" c="dimmed" mt={4}>
                          {book.description || "No description."}
                        </Text>
                      </Collapse>
                    </td>
                  </tr>
                ),
              ];
            })
          ) : (
            <tr>
              <td colSpan={4}>
                <Text size="sm" fw={500}>
                  No books found.
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Paper>
  );
};
const ToggleDescription = ({ description }: { description: string }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Text
        size="xs"
        c="blue"
        mt={4}
        style={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={() => setOpened((o) => !o)}
      >
        {opened ? "Hide description" : "Show description"}
      </Text>

      <Collapse in={opened}>
        <Text size="xs" c="dimmed" mt={4}>
          {description || "No description."}
        </Text>
      </Collapse>
    </>
  );
};
export default BookTable;
