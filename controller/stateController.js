const State = require('../model/State');
const states = require('../model/state.json');

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