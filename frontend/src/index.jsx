import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ToastContainer /> {/* Add ToastContainer for toast notifications */}
    <App />
  </BrowserRouter>
);
