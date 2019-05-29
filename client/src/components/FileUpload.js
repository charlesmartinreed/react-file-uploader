// using hooks, so functional components are fine here

import React, { useState } from "react";
// state holds file, filename
// instead of set state, we call setFile to change the file value
// value passed to useState is the default value for the state prop

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Select your file");

  const onChange = e => {
    // single file upload
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  // send updated file to server
  const onSubmit = e => {
    e.preventDefault();
    // FormData is vanilla JS
    const formData = new FormData();

    // access the file from state, pass as 'file' because this is what we've told express-fileupload to expect in server.js
    formData.append("file", file);
  };

  return (
    <>
      <form>
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
          onSubmit={onSubmit}
        />
      </form>
    </>
  );
};

export default FileUpload;
