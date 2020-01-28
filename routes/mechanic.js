const express = require('express');
const MechanicController = require('../controllers/mechanic');
const api = express.Router();


api.post('/mechanicsnearby', MechanicController.fetchNearestMechanics)
api.get('/mechanicdetails', MechanicController.fetchMechanicDetails)

module.exports = api;
