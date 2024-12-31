import React from "react";
import "./global.css";
import ThemeProvider from "./theme/index.jsx";
import MainRouter from "./Routes/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  // useScrollToTop();
  return (
    <ThemeProvider>
      <MainRouter />
      <Toaster />
    </ThemeProvider>
  );
}
export default App;
