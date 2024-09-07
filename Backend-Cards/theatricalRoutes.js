const express = require('express');
const router = express.Router();
const theatricalController = require('./theatricalController');

// Route to get all states
router.get('/states', theatricalController.getAllStates);

// Route to get all cities by state name
router.get('/cities/:state', theatricalController.getCitiesByState);

// Route to get all malls by city name
router.get('/malls/:city', theatricalController.getMallsByCity);

// Route to get details of a mall by mall name
router.get('/mall/:mall', theatricalController.getMallDetails);

//Route to get image link of a mall by mall name
router.get('/mall/image/:mall', theatricalController.getImageByMall);

// Route to update fields by state name, city name, or mall name
router.put('/update/state/:state', theatricalController.updateByState);
router.put('/update/city/:city', theatricalController.updateByCity);
router.put('/update/mall/:mall', theatricalController.updateByMall);

// Route to delete by state name, city name, or mall name
router.delete('/delete/state/:state', theatricalController.deleteByState);
router.delete('/delete/city/:city', theatricalController.deleteByCity);
router.delete('/delete/mall/:mall', theatricalController.deleteByMall);

// Route to add a new theatrical entry
router.post('/add', theatricalController.addTheatricalEntry);

//Route to get all theatres by city name
router.get("/city/:city", theatricalController.getTheatres);

module.exports = router;
