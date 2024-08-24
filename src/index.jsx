import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.js";
import { FireStoreDataContext } from "./context/FireStoreContext.js";
import { MantineProvider } from "@mantine/core";

import '@mantine/core/styles.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider>
    <AuthProvider>
      <FireStoreDataContext>
      <App />
      </FireStoreDataContext>
    </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
