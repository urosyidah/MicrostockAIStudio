import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
// Tanda seru (!) di bawah ini sangat PENTING untuk TypeScript
// Itu memberi tahu sistem: "Saya yakin elemen 'root' pasti ada, jangan khawatir."
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
