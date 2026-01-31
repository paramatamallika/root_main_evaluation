const supabase = require('../config/supabase')

// CREATE Trip
exports.createTrip = async (req, res) => {
  try {
    const { vehicle_id, passengers, distance_km, start_date, end_date, location } = req.body

    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', vehicle_id)
      .single()

    if (vehicleError || !vehicle)
      return res.status(404).json({ message: 'Vehicle not found' })

    if (!vehicle.isavailable)
      return res.status(400).json({ message: 'Vehicle not available' })

    if (passengers > vehicle.allowed_passengers)
      return res.status(400).json({ message: 'Passenger limit exceeded' })

    const { data: trip, error: tripError } = await supabase
      .from('trips')
      .insert([{
        customer_id: req.user.id,
        vehicle_id,
        passengers,
        distance_km,
        start_date,
        end_date,
        location
      }])
      .select()
      .single()

    if (tripError) return res.status(400).json({ message: tripError.message })

    // Mark vehicle unavailable
    await supabase.from('vehicles')
      .update({ isavailable: false })
      .eq('id', vehicle_id)

    res.status(201).json({ message: 'Trip created', trip })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE Trip
exports.updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params
    const updates = req.body

    const { data: trip, error: tripError } = await supabase
      .from('trips')
      .select('*')
      .eq('id', tripId)
      .single()

    if (tripError || !trip) return res.status(404).json({ message: 'Trip not found' })

    if (trip.customer_id !== req.user.id)
      return res.status(403).json({ message: 'Access denied' })

    // Check passenger limit if updating passengers
    if (updates.passengers) {
      const { data: vehicle } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', trip.vehicle_id)
        .single()

      if (updates.passengers > vehicle.allowed_passengers)
        return res.status(400).json({ message: 'Passenger limit exceeded' })
    }

    const { data: updatedTrip, error: updateError } = await supabase
      .from('trips')
      .update(updates)
      .eq('id', tripId)
      .select()
      .single()

    if (updateError) return res.status(400).json({ message: updateError.message })

    res.json({ message: 'Trip updated', trip: updatedTrip })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// END Trip
exports.endTrip = async (req, res) => {
  try {
    const { tripId } = req.params

    const { data: trip, error: tripError } = await supabase
      .from('trips')
      .select('*, vehicles(rate_per_km)')
      .eq('id', tripId)
      .single()

    if (tripError || !trip) return res.status(404).json({ message: 'Trip not found' })

    const tripCost = trip.distance_km * trip.vehicles.rate_per_km

    await supabase.from('trips')
      .update({ iscompleted: true, tripcost: tripCost })
      .eq('id', tripId)

    await supabase.from('vehicles')
      .update({ isavailable: true })
      .eq('id', trip.vehicle_id)

    res.json({ message: 'Trip ended', tripCost })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE Trip
exports.deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.params

    const { data: trip, error: tripError } = await supabase
      .from('trips')
      .select('*')
      .eq('id', tripId)
      .single()

    if (tripError || !trip) return res.status(404).json({ message: 'Trip not found' })

    if (trip.customer_id !== req.user.id)
      return res.status(403).json({ message: 'Access denied' })

    await supabase
      .from('trips')
      .delete()
      .eq('id', tripId)

    // Make vehicle available again if trip not completed
    if (!trip.iscompleted) {
      await supabase
        .from('vehicles')
        .update({ isavailable: true })
        .eq('id', trip.vehicle_id)
    }

    res.json({ message: 'Trip deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
