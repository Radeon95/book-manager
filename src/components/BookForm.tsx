import {
  Modal,
  TextInput,
  NumberInput,
  Textarea,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Book } from "../types/Book";
import { useEffect } from "react";

interface BookFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (book: Book) => void;
  initialValues?: Book | null;
}

const BookForm = ({
  opened,
  onClose,
  onSubmit,
  initialValues,
}: BookFormProps) => {
  const form = useForm<Book>({
    initialValues: {
      title: "",
      author: "",
      year: new Date().getFullYear(),
      description: "",
    },

    validate: {
      title: (value) =>
        value.trim().length === 0 ? "Title is required" : null,
      author: (value) =>
        value.trim().length === 0 ? "Author is required" : null,
      year: (value) =>
        value < 0 || value > new Date().getFullYear() ? "Invalid year" : null,
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
    } else {
      form.reset();
    }
  }, [opened, initialValues]);

  const handleSubmit = (values: Book) => {
    onSubmit(values);
    onClose();
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialValues ? "Edit Book" : "Add Book"}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter title"
          withAsterisk
          {...form.getInputProps("title")}
          radius="md"
          size="md"
          mt="sm"
        />

        <TextInput
          mt="sm"
          label="Author"
          placeholder="Enter author"
          withAsterisk
          {...form.getInputProps("author")}
        />

        <NumberInput
          mt="sm"
          label="Year"
          placeholder="Enter year"
          withAsterisk
          value={form.values.year}
          onChange={(value) =>
            form.setFieldValue("year", typeof value === "number" ? value : 0)
          }
          error={form.errors.year}
          min={0}
          max={new Date().getFullYear()}
        />

        <Textarea
          mt="sm"
          label="Description"
          placeholder="Enter short description"
          autosize
          minRows={2}
          {...form.getInputProps("description")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">{initialValues ? "Update" : "Add"}</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default BookForm;
