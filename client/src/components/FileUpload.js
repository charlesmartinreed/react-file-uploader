import React, { Fragment, useState } from "react";
import Message from "./Message";
import axios from "axios";

// holds state
// as this is JSX, not HTML, class becomes 'className', for becomes 'htmlFor', the /> is mandatory for input...
const FileUpload = () => {
  // takes an initial state, which is set to '' here
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");

  // since we're returning an object from the backend upon succesful upload, we set our initial state for uploadedFile to be an empty object
  const [uploadedFile, setUploadedFile] = useState({});

  const [message, setMessage] = useState("");

  const onChange = e => {
    // with hooks, instead of using this.setState, we use the state descriptors we set using useState to change the value

    // files input in HTML5 is a collection
    // the file object is what we want to send to our server
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();

    // in order to submit file, must add to form data
    const formData = new FormData();

    // to the file object, append the file from our current state
    formData.append("file", file);

    try {
      // we don't have to specify "localhost:3000" because we added a proxy in package.json
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage("File Uploaded!");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  // if there's a message, per the state, display it. If not, display nothing.
  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
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
          className="btn btn-primary btn-block mt-2"
        />
      </form>

      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
