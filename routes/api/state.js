const express = require('express');
const router = express.Router();

const stateController = require('../../controller/stateController');

router.get('/', stateController.getStates);
router.route("/:code").get(stateController.getState);
router.get('/:state/funfact', stateController.getFunFact);

module.exports = router;