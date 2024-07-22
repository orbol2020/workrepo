const express = require('express');
const router = express.Router();
const screenController = require('./screenController');


router.get("/cost/:cinema/:screenID", screenController.getCost);

module.exports = router;