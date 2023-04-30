const express = require('express');
const router = express.Router();
const stateController = require('../../controller/stateController');

router.get('/', stateController.getStates);
router.route('/:statecode').get(stateController.getState);

router.get('/:code/funfact', stateController.getFunFact);

module.exports = router;
