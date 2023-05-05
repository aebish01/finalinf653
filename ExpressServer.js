require("dotenv").config();
const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose"); // <-- add require here
const connectDB = require("./config/dbConfig");
const PORT = process.env.PORT || 3000;

//connect to DB
connectDB();
// logger in middleware
app.use(logger);
//cors
app.use(cors(corsOptions));

// built in middleware to handel urlencoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// To handel static files in main and Sub Dir
//app.use(express.static(path.join(__dirname, "/public")));
//app.use("/subdir", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
//api
app.use("/states", require("./routes/api/state"));
//app.use("/states/:state", require("./routes/api/state"));

// 404 Route for un-defined
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "view", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
// Error logger
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  
  const listener = app.listen(PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
});