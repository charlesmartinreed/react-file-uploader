// using hooks, so functional components are fine here

import React, { useState } from "react";
import axios from "axios";

// state holds file, filename
// instead of set state, we call setFile to change the file value
// value passed to useState is the default value for the state prop

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Select your file");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    // single file upload
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  // send updated file to server
  const onSubmit = async e => {
    e.preventDefault();
    // FormData is vanilla JS
    const formData = new FormData();
    // access the file from state, pass as 'file' because this is what we've told express-fileupload to expect in server.js
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // express server returns an object with uploaded image info
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      console.log("file uploaded");
    } catch (err) {
      // check the error type
      if (err.response.status === 500) {
        console.log(
          `${err.response.status}: There was a problem with the server`
        );
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
    </>
  );
};

export default FileUpload;
