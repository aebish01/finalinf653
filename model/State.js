const mongoose = require("mongosse");
const Schema = mongoose.Schema;


const stateSchema = new Schema({
    stateCode: String,
    funfacts: [String]
  });

  module.exports = mongoose.model("State", stateSchema);