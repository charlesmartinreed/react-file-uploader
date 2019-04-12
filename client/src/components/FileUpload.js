import React, { Fragment } from "react";

// holds state
// as this is JSX, not HTML, class becomes 'className', for becomes 'htmlFor', the /> is mandatory for input...
const FileUpload = () => {
  return (
    <Fragment>
      <form>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" />
          <label className="custom-file-label" htmlFor="customFile">
            Choose file
          </label>
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-2"
        />
      </form>
    </Fragment>
  );
};

export default FileUpload;
