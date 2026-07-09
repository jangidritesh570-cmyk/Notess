import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1E293B",
              color: "#F8FAFC",
              border: "1px solid #334155",
            },
            success: {
              iconTheme: {
                primary: "#22C55E",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);