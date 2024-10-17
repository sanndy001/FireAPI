// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./firebaseConfig"; // Ensure Firebase is initialized

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
