import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { LibraryProvider } from "./context/LibraryContext";
import ThemeProvider from "./context/ThemeContext";

//StrictMode: find mistakes while developing

//BrowserRouter comes from React Router.
//It allows your React app to have multiple pages without reloading the website
// used page navigations

//LibraryProvider: Instead of passing data through every component,
// you simply make the data available to everyone.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LibraryProvider>
          <App />
        </LibraryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
