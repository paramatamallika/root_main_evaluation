const supabase = require('../config/supabase')

exports.addVehicle = async (req, res) => {
  const { name, registration_number, allowed_passengers, rate_per_km } = req.body

  const { error } = await supabase.from('vehicles').insert([{
    name,
    registration_number,
    allowed_passengers,
    rate_per_km,
    owner_id: req.user.id
  }])

  if (error) return res.status(400).json({ error: error.message })

  res.status(201).json({ message: 'Vehicle added successfully' })
}

exports.assignDriver = async (req, res) => {
  const { vehicleId } = req.params
  const { driver_id } = req.body

  await supabase
    .from('vehicles')
    .update({ driver_id })
    .eq('id', vehicleId)

  res.json({ message: 'Driver assigned successfully' })
}

exports.getVehicle = async (req, res) => {
  const { vehicleId } = req.params

  const { data } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', vehicleId)
    .single()

  res.json(data)
}
