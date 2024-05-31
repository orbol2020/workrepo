const express = require('express');
const router = express.Router();
const detailsController = require('./detailsController');

// Route to get all card_ids
router.get('/ids', detailsController.getAllIds);

// Route to get detail by card_id
router.get('/:card_id', detailsController.getDetailsById);

// Route to create a new detail
router.post('/', detailsController.createDetail);

// Route to delete detail by card_id
router.delete('/:card_id', detailsController.deleteDetail);

// Route to update detail by card_id
router.put('/:card_id', detailsController.updateDetail);

module.exports = router;
