import "./assets/reset.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { SidebarProvider } from "./context/SidebarProvider";
import { AuthProvider } from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
