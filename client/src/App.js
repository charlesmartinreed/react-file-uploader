import React from "react";
import "./App.css";
import { FaReact } from "react-icons/fa";
import FileUpload from "./components/FileUpload";
// import { } from 'react-icons/fa'

const App = () => (
  <div className="container mt-4">
    <h4 className="display-4 text-center mb-4">
      <FaReact /> React Image Uploader
    </h4>
    <FileUpload />
  </div>
);

export default App;
