import { Modal, Text, Stack, Title } from "@mantine/core";
import type { Book } from "../types/Book";

interface BookDetailsModalProps {
  opened: boolean;
  book: Book | null;
  onClose: () => void;
}

const BookDetailsModal = ({ opened, book, onClose }: BookDetailsModalProps) => {
  if (!book) return null;

  return (
    <Modal opened={opened} onClose={onClose} title="Book Details" size="md">
      <Stack gap="xs">
        <div>
          <Title order={5}>Title</Title>
          <Text>{book.title}</Text>
        </div>

        <div>
          <Title order={5}>Author</Title>
          <Text>{book.author}</Text>
        </div>

        <div>
          <Title order={5}>Year</Title>
          <Text>{book.year}</Text>
        </div>

        <div>
          <Title order={5}>Description</Title>
          <Text>{book.description}</Text>
        </div>
      </Stack>
    </Modal>
  );
};

export default BookDetailsModal;
