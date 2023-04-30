const express = require("express");
const router = express();
const path = require("path");

router.get("^/$|/sub(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "subdir", "sub.html"));
});

router.get("/test.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "subdir", "test.html"));
});

module.exports = router;