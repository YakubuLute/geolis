import React from 'react';
import RouterComponent from "./Routes/Routes.tsx";
import { useScrollToTop } from './hooks/use-scroll-to-top.js';
import './global.css';
import ThemeProvider from './theme/index.jsx';
import MainRouter from './Routes/Routes.tsx';
import { ToastContainer } from 'react-toastify';

function App() {
  // useScrollToTop();
  return (
  <ThemeProvider>

    <MainRouter />
</ThemeProvider>

  );
}
export default App;

