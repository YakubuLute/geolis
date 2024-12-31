import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "leaflet/dist/leaflet.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.js";
import { FireStoreDataContext } from "./context/FireStoreContext.js";
import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider>
      <AuthProvider>
        <HelmetProvider>
          <Suspense>
            <FireStoreDataContext>
              <App />
            </FireStoreDataContext>
          </Suspense>
        </HelmetProvider>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
