import React from 'react';
import RouterComponent from "./Routes/Routes.tsx";
import { useScrollToTop } from './hooks/use-scroll-to-top.js';
import './global.css';
import ThemeProvider from './theme/index.jsx';

function App() {
  // useScrollToTop();
  return (
  <ThemeProvider>
    <RouterComponent />
</ThemeProvider>

  );
}
export default App;

