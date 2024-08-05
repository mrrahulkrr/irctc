"use client"
import React, { useState } from 'react';
import axios from 'axios';

const BookingsPage = () => {
  const [bookingId, setBookingId] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);

  const getBookingDetails = async () => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`http://localhost:8080/api/bookings/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookingDetails(response.data);
  };

  return (
    <div>
      <h1>Get Booking Details</h1>
      <input
        type="text"
        placeholder="Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
      />
      <button onClick={getBookingDetails}>Get Details</button>
      {bookingDetails && (
        <div>
          <p>Booking ID: {bookingDetails.booking_id}</p>
          <p>Train ID: {bookingDetails.train_id}</p>
          <p>Train Name: {bookingDetails.train_name}</p>
          <p>User ID: {bookingDetails.user_id}</p>
          <p>No of Seats: {bookingDetails.no_of_seats}</p>
          <p>Seat Numbers: {bookingDetails.seat_numbers.join(', ')}</p>
          <p>Arrival Time at Source: {bookingDetails.arrival_time_at_source}</p>
          <p>Arrival Time at Destination: {bookingDetails.arrival_time_at_destination}</p>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
