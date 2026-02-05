import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Pastikan ini mengarah ke file App yang baru Anda edit
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
