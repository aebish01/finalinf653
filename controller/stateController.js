const fs = require('fs');
const { State } = require('../model/State');
const { StatePostFunFact } = require('../model/State');
const { StatePatchFunFact } = require('../model/State');
const states = require('../model/state.json');
//get states
exports.getStates = async (req, res) => {
  let filteredStates = states;

  if (req.query.contig) {
    if (req.query.contig === 'true') {
      filteredStates = filteredStates.filter((state) => {
        return state.code !== 'HI' && state.code !== 'AK';
      });
    } else if (req.query.contig === 'false') {
      filteredStates = filteredStates.filter((state) => {
        return state.code === 'HI' || state.code === 'AK';
      });
    } 
  }

  for (let i = 0; i < filteredStates.length; i++) {
    const state = filteredStates[i];
    const result = await State.findOne({ stateCode: state.stateCode });
    if (result) {
      state.funfacts = result.funfacts;
    }
  }

  res.json(filteredStates);
};

//get one state
exports.getState = async (req, res) => {
  try {
    const statecode = req.params.statecode;
    if (!statecode) {
      return res.status(400).json({ message: 'State code is required' });
    }

    const state = states.find(state => state.code === statecode.toUpperCase());
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.json(state);
  } catch(error) {
    console.log(error);
  }
};
//get state and capital 
exports.getStateCapital = async (req, res) => {
  try {
    const statecode = req.params.statecode;
    if (!statecode) {
      return res.status(400).json({ message: 'State code is required' });
    }

    const state = states.find(state => state.code === statecode.toUpperCase());
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.json({ state: state.state, capital: state.capital_city });;
  } catch(error) {
    console.log(error);
  }
};
//one state one nickname
exports.getStateNickname = async (req, res) => {
  try {
    const statecode = req.params.statecode;
    if (!statecode) {
      return res.status(400).json({ message: 'State code is required' });
    }

    const state = states.find(state => state.code === statecode.toUpperCase());
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.json({ state: state.state, NickName: state.nickname });;
  } catch(error) {
    console.log(error);
  }
};
//one state one population 
exports.getStatePopulation = async (req, res) => {
  try {
    const statecode = req.params.statecode;
    if (!statecode) {
      return res.status(400).json({ message: 'State code is required' });
    }

    const state = states.find(state => state.code === statecode.toUpperCase());
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.json({ state: state.state, Population: state.population });;
  } catch(error) {
    console.log(error);
  }
};
//one state one admission 
exports.getStateAdmission = async (req, res) => {
  try {
    const statecode = req.params.statecode;
    if (!statecode) {
      return res.status(400).json({ message: 'State code is required' });
    }

    const state = states.find(state => state.code === statecode.toUpperCase());
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.json({ state: state.state, admitted: state.admission_date });;
  } catch(error) {
    console.log(error);
  }
};
//one state and ransom funfats if any
exports.getFunFact = async (req, res) => {
  const statecode = req.params.statecode;
  if (!statecode) {
    return res.status(400).json({ message: 'State code is required' });
  }

  const result = states.find(state => state.code === statecode.toUpperCase());
  if (result) {
    const funfacts = result.funfacts;
    if (funfacts && funfacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * funfacts.length);
      res.json({ funfact: funfacts[randomIndex] });
    } else {
      res.status(404).json({ message: 'No fun facts found for state.' });
    }
  } else {
    res.status(404).json({ message: 'State not found.' });
  }
};

//post funfacts write to json
exports.postFunFacts = async (req, res) => {
  const statecode = req.params.statecode;
  if (!statecode) {
    return res.status(400).json({ message: 'State code is required' });
  }

  // Read the existing data from state.json file
  const rawData = fs.readFileSync('./model/state.json');
  const data = JSON.parse(rawData);

  // Find the relevant state object based on the provided state code
  const stateObj = data.find(state => state.code === statecode.toUpperCase());

  if (!stateObj) {
    return res.status(404).json({ message: 'State not found' });
  }

  // Create the funfacts array in the state object if it does not exist
  if (!stateObj.funfacts) {
    stateObj.funfacts = [];
  }

  // Add the new fun fact to the funfacts array of the state object
  const funfact = req.body.funfact;
  stateObj.funfacts.push(funfact);

  // Convert the JavaScript object/array back to JSON and save it to the file
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync('./model/state.json', json);

  // Save the modified data to the database using Mongoose
  const result = await StatePostFunFact.findOne();
  result.funfacts.push(funfact);
  await result.save();

  res.status(201).json(result);
};

//patch and write to funfacts 
exports.patchFunFacts = async (req, res) => {
  try {
    // Parse the request body to extract the index and new fun fact
    const { index, funfact } = req.body;
    if (!index) {
      return res.status(400).json({ error: 'Index is required in request body' });
    }

    // Convert the index to zero-based by subtracting 1
    const zeroBasedIndex = parseInt(index) - 1;

    // Find the document for the specified state in the "states" collection
    const statecode = req.params.statecode;
    if (!statecode) {
      return res.status(400).json({ message: 'State code is required' });
    }
    const states = JSON.parse(fs.readFileSync('./model/state.json'));
    const stateObj = states.find(state => state.code === statecode.toUpperCase());

    if (!stateObj) {
      return res.status(404).json({ error: `State "${statecode}" not found` });
    }

    // Check if the funfacts array exists for the specified state
    if (!stateObj.funfacts) {
      return res.status(400).json({ message: `No funfacts found for state "${statecode}"` });
    }

    // Check if the provided index is within the range of the funfacts array
    if (zeroBasedIndex < 0 || zeroBasedIndex >= stateObj.funfacts.length) {
      return res.status(400).json({ message: `Index ${index} is out of range for state "${statecode}"` });
    }

    // Update the specified fun fact in the "funfacts" array
    stateObj.funfacts[zeroBasedIndex] = funfact;

    // Update the JSON file with the updated data
    fs.writeFileSync('./model/state.json', JSON.stringify(states, null, 2));

    // Return the updated fun fact as the response
    res.json({ funfacts: stateObj.funfacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
// delete a funfact by index write to json
exports.deleteFunFact = async (req, res) => {
  try {
    const { index } = req.body;
    if (!index) {
      return res.status(400).json({ error: 'Index is required in request body' });
    }
    const statecode = req.params.statecode;
    if (!statecode) {
      return res.status(400).json({ message: 'State code is required' });
    }
    const states = JSON.parse(fs.readFileSync('./model/state.json'));
    const stateObj = states.find(state => state.code === statecode.toUpperCase());
    if (!stateObj) {
      return res.status(404).json({ error: `State "${statecode}" not found` });
    }
    const funfacts = stateObj.funfacts || [];
    const zeroBasedIndex = parseInt(index) - 1;
    if (zeroBasedIndex >= funfacts.length) {
      return res.status(404).json({ error: 'Fun fact not found at the specified index' });
    }
    funfacts.splice(zeroBasedIndex, 1);
    fs.writeFileSync('./model/state.json', JSON.stringify(states, null, 2));
    res.json({ funfacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
  
