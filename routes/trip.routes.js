const express = require('express')
const router = express.Router()
const role = require('../middlewares/role.middleware')
const controller = require('../controllers/trip.controller')

router.post('/create', role('customer'), controller.createTrip)
router.patch('/end/:tripId', controller.endTrip)

module.exports = router
