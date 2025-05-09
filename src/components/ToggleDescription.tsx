import { useState } from "react";
import { Text, Collapse } from "@mantine/core";

interface ToggleDescriptionProps {
  description: string;
  externallyControlled?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

const ToggleDescription = ({
  description,
  externallyControlled = false,
  isOpen,
  onToggle,
}: ToggleDescriptionProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const opened = externallyControlled ? isOpen : internalOpen;

  const toggle = () => {
    if (externallyControlled && onToggle) {
      onToggle();
    } else {
      setInternalOpen((prev) => !prev);
    }
  };

  return (
    <>
      <Text
        size="xs"
        c="blue"
        mt={4}
        style={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={toggle}
      >
        {opened ? "Hide description" : "Show description"}
      </Text>

      <Collapse in={opened ?? false} transitionDuration={200}>
        <Text size="xs" c="dimmed" mt={4}>
          {description || "No description."}
        </Text>
      </Collapse>
    </>
  );
};

export default ToggleDescription;
