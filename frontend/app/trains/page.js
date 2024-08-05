"use client";

import React, { useState } from 'react';
import axios from 'axios';

const TrainsPage = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [noOfSeats, setNoOfSeats] = useState('');
  const [userId, setUserId] = useState(''); // Set userId appropriately
  const [bookingResult, setBookingResult] = useState(null);
  const [error, setError] = useState('');

  const checkAvailability = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/trains/availability', {
        params: { source, destination }
      });
      setTrains(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching trains:', error);
      setError('Failed to fetch trains. Please check console for details.');
    }
  };

  const bookSeat = async () => {
    // if (!selectedTrain || !noOfSeats || !userId) {
    //   setError('Please select a train, enter the number of seats, and provide user ID.');
    //   return;
    // }

    try {
      const token = localStorage.getItem('token'); // Ensure token is available
      console.log({userId, noOfSeats, selectedTrain})
      const response = await axios.post(`http://localhost:8080/api/trains/book`, {
        user_id: userId,
        no_of_seats: noOfSeats
      },{
        params: {
          train_id: selectedTrain
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setBookingResult(response.data);
      setError('');
    } catch (error) {
      console.error('Error booking seat:', error);
      setError('Failed to book seat. Please check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Check Train Availability</h1>
      <div className="max-w-md mx-auto bg-white p-4 rounded shadow-md">
        <input
          type="text"
          className="w-full mb-2 p-2 border rounded"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          onClick={checkAvailability}
        >
          Check Availability
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <ul className="max-w-md mx-auto mt-6 space-y-4">
        {Array.isArray(trains) && trains.length > 0 ? (
          trains.map((train) => (
            <li
              key={train.train_id}
              className="bg-white p-4 rounded shadow-md flex justify-between items-center"
            >
              <span>{train.trainName} - Available Seats: {train.availableSeats}</span>
              <button
                className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition"
                onClick={() => setSelectedTrain(train.train_id)}
              >
                Select Train
              </button>
            </li>
          ))
        ) : (
          <p className="text-center">No trains available</p>
        )}
      </ul>

      {selectedTrain && (
        <div className="max-w-md mx-auto mt-6 bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Book Seats on Train {selectedTrain}</h2>
          <input
            type="number"
            className="w-full mb-2 p-2 border rounded"
            placeholder="Number of Seats"
            value={noOfSeats}
            onChange={(e) => setNoOfSeats(e.target.value)}
          />
          <button
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            onClick={bookSeat}
          >
            Book Seat
          </button>
        </div>
      )}

      {bookingResult && (
        <div className="max-w-md mx-auto mt-6 bg-white p-4 rounded shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Booking Result</h2>
          <p>{bookingResult.message}</p>
          <p>Booking ID: {bookingResult.booking_id}</p>
          <p>Seat Numbers: {bookingResult.seat_numbers.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default TrainsPage;
