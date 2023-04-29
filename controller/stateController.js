const State = require('../model/State');
const states = require('../routes/states.json');

exports.getStates = async (req, res) => {
  let filteredStates = states;

  if (req.query.contig) {
    if (req.query.contig === '1') {
      filteredStates = states.filter((state) => {
        return state.stateCode !== 'HI' && state.stateCode !== 'AK';
      });
    } else if (req.query.contig === '0') {
      filteredStates = states.filter((state) => {
        return state.stateCode === 'HI' || state.stateCode === 'AK';
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

exports.getState = async (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const state = states.find((s) => s.stateCode === stateCode);

  if (state) {
    const result = await State.findOne({ stateCode: stateCode });
    if (result) {
      state.funfacts = result.funfacts;
    }
    res.json(state);
  } else {
    res.status(404).json({ message: 'State not found' });
  }
};

exports.getFunFact = async (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const state = states.find((s) => s.stateCode === stateCode);

  if (state) {
    const result = await State.findOne({ stateCode: stateCode });
    if (result) {
      const funfacts = result.funfacts;
      if (funfacts.length > 0) {
        const randomIndex = Math.floor(Math.random() * funfacts.length);
        res.json({ funfact: funfacts[randomIndex] });
      } else {
        res.status(404).json({ message: 'No fun facts found for state.' });
      }
    } else {
      res.status(404).json({ message: 'State not found.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid state code.' });
  }
};