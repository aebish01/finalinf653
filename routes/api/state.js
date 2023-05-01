const express = require('express');
const router = express.Router();
const stateController = require('../../controller/stateController');

router.get('/', stateController.getStates);
router.route('/:statecode').get(stateController.getState);
router.route('/:statecode/capital').get(stateController.getStateCapital);
router.route('/:statecode/nickname').get(stateController.getStateNickname);
router.route('/:statecode/population').get(stateController.getStatePopulation);
router.route('/:statecode/admission').get(stateController.getStateAdmission);
router.get('/:code/funfact', stateController.getFunFact);

module.exports = router;
