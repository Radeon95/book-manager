import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import ToggleDescription from "../ToggleDescription";

const renderWithProvider = (ui: React.ReactNode) =>
  render(<MantineProvider>{ui}</MantineProvider>);

test("toggles description visibility", () => {
  renderWithProvider(<ToggleDescription description="Detail text" />);

  const toggleText = screen.getByText("Show description");
  const description = screen.getByText("Detail text");
  expect(description.parentElement).toHaveStyle("height: 0");

  fireEvent.click(toggleText);
  expect(screen.getByText("Detail text")).toBeInTheDocument();
});
