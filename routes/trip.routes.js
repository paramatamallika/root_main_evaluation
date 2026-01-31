const express = require('express')
const router = express.Router()
const role = require('../middlewares/role.middleware')
const controller = require('../controllers/trip.controller')

// Create Trip (Customer only)
router.post('/create', role('customer'), controller.createTrip)

// Update Trip (Customer only)
router.patch('/update/:tripId', role('customer'), controller.updateTrip)

// End Trip
router.patch('/end/:tripId', controller.endTrip)

// Delete Trip (Customer only)
router.delete('/delete/:tripId', role('customer'), controller.deleteTrip)

module.exports = router
