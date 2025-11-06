const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello from Firebase!" });
});

exports.api = functions.https.onRequest(app);
