"use client";
import React, { useState } from 'react';
import axios from 'axios';

const BookSeatPage = () => {
  const [trainId, setTrainId] = useState('');
  const [userId, setUserId] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleBookSeat = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:8080/api/book-seat', {
        trainId,
        userId,
        numberOfSeats
      }, {
        headers: {
            // 'x-api-key': 'your_api_key',
          Authorization: `Bearer ${token}`

        }
      });

      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError('Failed to book seat. Please check console for details.');
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Book a Seat</h1>
      <form onSubmit={handleBookSeat}>
        {/* <input
          type="text"
          placeholder="Train ID"
          value={trainId}
          onChange={(e) => setTrainId(e.target.value)}
          required
        /> */}
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Number of Seats"
          value={numberOfSeats}
          onChange={(e) => setNumberOfSeats(e.target.value)}
          required
        />
        <button type="submit">Book Seat</button>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default BookSeatPage;
