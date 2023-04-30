const express = require("express");
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
//app.use("/state/:state", require("./routes/api/state"))


mongoose.connection.once("open", () => {
    console.log("Connected to mongoDB");
    app.listen(PORT, () => console.log(`Server is listing on port ${PORT}`));
  });