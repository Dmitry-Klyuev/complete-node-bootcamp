const express = require('express')
const crypto = require("crypto");
const fs = require("fs");
const tourController = require('./../controllers/tourController')

const router = express.Router();

router.route('/')
    .get(tourController.getAllTour)
    .post(tourController.createTour)
router.route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

module.exports = router