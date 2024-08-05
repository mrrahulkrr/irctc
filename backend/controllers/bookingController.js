// backend/controllers/bookingController.js
const { getBookingById } = require('../models/Booking');

const { Booking, Train } = require('../models'); // Ensure your Train and Booking models are imported

const bookSeat = async (req, res) => {
  const { trainId, userId, numberOfSeats } = req.body;

  try {
    // Find the train and check availability
    const train = await Train.findByPk(trainId);
    if (!train) return res.status(404).json({ message: 'Train not found' });

    if (train.available_seats < numberOfSeats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Create a new booking
    const booking = await Booking.create({ trainId, userId, numberOfSeats });
    // Update the available seats for the train
    train.available_seats -= numberOfSeats;
    await train.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getBookingDetails = async (req, res) => {
  const { booking_id } = req.params;
  const booking = await getBookingById(booking_id);
  res.json(booking);
};

module.exports = { bookSeat, getBookingDetails };
