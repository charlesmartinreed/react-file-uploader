import React from "react";
import FileUpload from "./components/FileUpload";
import "./App.css";

// using React Hooks, so we don't need a class component
const App = () => (
  <div className="container mt-4">
    <h4 className="display-4 text-center mb-4">
      <i className="fab fa-react" /> React File Uploader
    </h4>
    <FileUpload />
  </div>
);

export default App;
