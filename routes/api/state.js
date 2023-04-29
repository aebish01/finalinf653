const express = require('express');
const router = express.Router();

const statesController = require('../controllers/statesController');

router.get('/', statesController.getStates);
router.get('/:state', statesController.getState);
router.get('/:state/funfact', statesController.getFunFact);

module.exports = router;