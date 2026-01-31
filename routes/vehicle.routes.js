const express = require('express')
const router = express.Router()
const limiter = require('../middlewares/rateLimiter.middleware')
const role = require('../middlewares/role.middleware')
const controller = require('../controllers/vehicle.controller')

router.post('/add', role('owner'), limiter, controller.addVehicle)
router.patch('/assign-driver/:vehicleId', role('owner'), controller.assignDriver)
router.get('/:vehicleId', controller.getVehicle)

module.exports = router
