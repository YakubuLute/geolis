import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";
import { MantineProvider } from "@mantine/core";

import '@mantine/core/styles.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider>
    <AuthProvider>
      <UserContext>
      <App />
      </UserContext>
    </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
