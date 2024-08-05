// backend/controllers/trainController.js
const Train = require('../models/Train'); // Ensure the path is correct
const { Train, Booking } = require('../models');
const { v4: uuidv4 } = require('uuid');

const addTrain = async (req, res) => {
  const { trainName, source, destination, seatCapacity, availableSeats, arrivalTimeAtSource, arrivalTimeAtDestination } = req.body;
  try {
    const train = await Train.create({ 
      trainName, 
      source, 
      destination, 
      seatCapacity,
      availableSeats,
      arrivalTimeAtSource, 
      arrivalTimeAtDestination 
    });
    res.status(201).json({ message: 'Train added successfully', train });
  } catch (error) {
    console.log({ message: error.message })
    res.status(400).json({ message: error.message });
  }
};

const getTrainAvailability = async (req, res) => {
  console.log('Received request for availability');
  const { source, destination } = req.query;
  console.log('Source:', source, 'Destination:', destination);
  try {
    const trains = await Train.findAll({ where: { source, destination } });
    res.json(trains.map(train => ({
      train_id: train.id,
      trainName: train.trainName,
      seatCapacity: train.seatCapacity
    })));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const bookSeat = async (req, res) => {
  const { train_id } = req.params;
  const { user_id, no_of_seats } = req.body;
  const { id: adminId } = req.user; // From authMiddleware

  try {
    // Find the train
    const train = await Train.findByPk(train_id);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }

    // Check seat availability
    if (train.available_seats < no_of_seats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Book seats
    const seatNumbers = []; // Generate or get seat numbers
    for (let i = 0; i < no_of_seats; i++) {
      seatNumbers.push(/* Seat number generation logic */);
    }

    const booking_id = uuidv4();
    // Save booking details to the database
    await Booking.create({
      booking_id,
      user_id,
      train_id,
      seat_numbers: seatNumbers,
      admin_id: adminId
    });

    // Update train's available seats
    await train.update({ available_seats: train.available_seats - no_of_seats });

    res.status(200).json({
      message: 'Seat booked successfully',
      booking_id,
      seat_numbers: seatNumbers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { addTrain, getTrainAvailability, bookSeat };
