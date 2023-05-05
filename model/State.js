const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const stateSchema = new Schema({
  state: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  admission_date: {
    type: Date,
    required: true
  },
  admission_number: {
    type: Number,
    required: true
  },
  capital_city: {
    type: String,
    required: true
  },
  capital_url: {
    type: String,
    required: true
  },
  population: {
    type: Number,
    required: true
  },
  population_rank: {
    type: Number,
    required: true
  },
  constitution_url: {
    type: String,
    required: true
  },
  state_flag_url: {
    type: String,
    required: true
  },
  state_seal_url: {
    type: String,
    required: true
  },
  map_image_url: {
    type: String,
    required: true
  },
  landscape_background_url: {
    type: String,
    required: true
  },
  skyline_background_url: {
    type: String,
    required: true
  },
  twitter_url: {
    type: String,
    required: true
  },
  facebook_url: {
    type: String,
    required: true
  },
  funfacts: {
    type: [String],
    default: []
  }
});

const stateFunFactSchema = new Schema({
  funfacts: [{ type: String }]
});

const statePatchFunFactsSchema = new Schema({
  state: {
    type: String,
  },
  slug: {
    type: String,
    
  },
  code: {
    type: String,
    
  },
  nickname: {
    type: String,
    
  },
  website: {
    type: String,
    
  },
  admission_date: {
    type: Date,
    
  },
  admission_number: {
    type: Number,
    
  },
  capital_city: {
    type: String,
    
  },
  capital_url: {
    type: String,
    
  },
  population: {
    type: Number,
    
  },
  population_rank: {
    type: Number,
    
  },
  constitution_url: {
    type: String,
    
  },
  state_flag_url: {
    type: String,
    
  },
  state_seal_url: {
    type: String,
    
  },
  map_image_url: {
    type: String,
    
  },
  landscape_background_url: {
    type: String,
    
  },
  skyline_background_url: {
    type: String,
    
  },
  twitter_url: {
    type: String,
    
  },
  facebook_url: {
    type: String,
    
  },
  funfacts: {
    type: [String],
    default: [],
  },
});

const State = mongoose.model("State", stateSchema);
const StatePostFunFact = mongoose.model('StatePostFunFact', stateFunFactSchema);
const StatePatchFunFact = mongoose.model('StatePatchFunFact', statePatchFunFactsSchema);
module.exports = {
  State,
  StatePatchFunFact,
  StatePostFunFact
};