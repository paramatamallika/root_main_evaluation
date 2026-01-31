require('dotenv').config()
const express = require('express')
const app = express()
const logger = require('./middlewares/logger.middleware')

// Parse JSON bodies
app.use(express.json())

// Logger middleware (logs all requests)
app.use(logger)

// --------------------
// Routes
// --------------------
app.use('/users', require('./routes/user.routes'))
app.use('/vehicles', require('./routes/vehicle.routes'))
app.use('/trips', require('./routes/trip.routes'))
app.use('/analytics', require('./routes/analytics.routes'))

// --------------------
// Debug Middleware (Optional, helps see requests in console)
// --------------------
app.use((req, res, next) => {
  console.log('DEBUG Request:', req.method, req.url)
  next()
})

// --------------------
// 404 Handler (must be last)
// --------------------
app.use((req, res) => {
  res.status(404).json({ message: 'This Request Is Not Found' })
})

// --------------------
// Start server
// --------------------
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
