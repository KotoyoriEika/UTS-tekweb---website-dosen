import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import { LecturerProvider } from "./context/LecturerContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LecturerProvider>
          <App />
          <Toaster position="top-right" />
        </LecturerProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);