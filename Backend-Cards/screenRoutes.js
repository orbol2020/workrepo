const express = require('express');
const router = express.Router();
const screenController = require('./screenController');


router.get("/cost/:cinema/:screenID/:placement", screenController.getCost);

module.exports = router;