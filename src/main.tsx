import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";

const queryClient = new QueryClient();

const theme = {
  colorScheme: "light",
  primaryColor: "blue", // Example of a valid property
  fontFamily: "Arial, sans-serif", // Example of a valid property
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Notifications position="top-center" limit={3} />
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
