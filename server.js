const express = require("express");
const fileUpload = require("express-fileupload");
const mime = require("mime");

const app = express();

// MIDDLEWARE SETUP
app.use(
  fileUpload({
    limits: { fileSize: 4 * 1024 * 1024 } //20 MB file limit
  })
);

// UPLOAD ENDPOINT
app.post("/upload", (req, res) => {
  if (Object.keys(req.files).length === 0) {
    res.status(400).json({ msg: "No file was uploaded" });
  }

  const allowedMimeTypes = ["image/png", "image/jpeg"];

  if (!allowedMimeTypes.includes(req.files.file.mimetype)) {
    return res
      .status(401)
      .json({ msg: "Only .png and .jpeg files are allowed" });
  }

  if (req.files.file.truncated) {
    return res.status(401).json({ msg: "Maximum upload size is 4MB" });
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
