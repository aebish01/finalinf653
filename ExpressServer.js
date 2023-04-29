const express = require("express");
const app = express();
const mongoose = require("mongoose"); // <-- add require here
const connectDB = require("./config/dbConfig");
const PORT = process.env.PORT || 3000;

//connect to DB
connectDB();




mongoose.connection.once("open", () => {
    console.log("Connected to mongoDB");
    app.listen(PORT, () => console.log(`Server is listing on port ${PORT}`));
  });