import React from "react";
import "./global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./routes";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
