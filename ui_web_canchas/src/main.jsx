import ReactDOM from "react-dom/client";
import { BrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import React from "react";
import { AuthProvider } from "./AuthContext.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
