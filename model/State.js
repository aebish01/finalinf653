const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const stateSchema = new Schema({
    code: String,
    funfacts: [String]
  });

  module.exports = mongoose.model("State", stateSchema);