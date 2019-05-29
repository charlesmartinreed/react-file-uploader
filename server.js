const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

// MIDDLEWARE SETUP
app.use(fileUpload());

// UPLOAD ENDPOINT
app.post("/upload", (req, res) => {
  if (Object.keys(req.files).length === 0) {
    res.status(400).json({ msg: "No file was uploaded" });
  }

  let file = req.files.file;

  // move the file to the appropriate place on your server
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    console.error(err);
    return res.status(500).send(err);
  });

  res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
});
// SERVER UPLOADED
app.listen(5000, () => console.log(`Server Started...`));
