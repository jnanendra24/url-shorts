const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const urlSchema = require("./schemas/urlSchema");

const PORT = process.env.PORT || 3000;
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the URL shortener service!");
});

app.get("/:shortCode", (req, res) => {
  const shortCode = req.params.shortCode;
  urlSchema
    .findOne({ shortCode: shortCode })
    .then((data) => {
      if (data) {
        res.redirect(data.originalUrl); // Redirect to the original URL
      }
    })
    .catch((err) => {
      res.json({ message: err });
    });
});
app.get("/api/recent", (req, res) => {
  urlSchema
    .find()
    .sort({ createdAt: -1 })
    .limit(5)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});
app.post("/api/shorten", (req, res) => {
  const originalUrl = req.body.original_url;
  if (originalUrl != "") {
    const shortCode = Math.random().toString(36).slice(-5);
    const newUrl = new urlSchema({
      originalUrl: originalUrl,
      shortCode: shortCode,
    });
    newUrl
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
