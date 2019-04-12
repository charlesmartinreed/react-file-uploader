const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());

// ROUTES
app.post("/upload", (req, res) => {
  // check that the request if a file - if not, send a 400 bad request
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  // if req was a file...
  const file = req.files.file;
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      // send a 500 Internal Server Error
      console.error(err);
      return res.status(500).send(err);
    }
    // if upload was succesful, send the filename and the file path
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5000, () => {
  console.log("Server started successfully!");
});
