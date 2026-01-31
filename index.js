require('dotenv').config()
const express = require('express')
const app = express()
const logger = require('./middlewares/logger.middleware')

app.use(express.json())
app.use(logger)

app.use('/users', require('./routes/user.routes'))
app.use('/vehicles', require('./routes/vehicle.routes'))
app.use('/trips', require('./routes/trip.routes'))
app.use('/analytics', require('./routes/analytics.routes'))

app.use((req, res) => {
  res.status(404).send('This Request Is Not Found')
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
