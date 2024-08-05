"use client";
// frontend/app/trains/add/page.js
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddTrainPage = () => {
  const [trainName, setTrainName] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [seatCapacity, setSeatCapacity] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [arrivalTimeAtSource, setArrivalTimeAtSource] = useState('');
  const [arrivalTimeAtDestination, setArrivalTimeAtDestination] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAddTrain = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      console.log("Token:", token);
      const formattedArrivalTimeAtSource = arrivalTimeAtSource || '';
      const formattedArrivalTimeAtDestination = arrivalTimeAtDestination || '';
      console.log("Payload:", {
        trainName,
        source,
        destination,
        seatCapacity,
        availableSeats,
        arrivalTimeAtSource: formattedArrivalTimeAtSource,
        arrivalTimeAtDestination: formattedArrivalTimeAtDestination,
      });
      const response = await axios.post('http://localhost:8080/api/trains/create', {
        trainName,
        source,
        destination,
        seatCapacity,
        availableSeats,
        arrivalTimeAtSource: formattedArrivalTimeAtSource,
        arrivalTimeAtDestination: formattedArrivalTimeAtDestination,
      }, {
        headers: {
          'x-api-key': 'your_api_key',
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Response Data:", response.data);
      if (response.status === 201) {
        console.log("Train added successfully");
        router.push('/trains');
      }
    } catch (error) {
      console.error("Error:", error);
      setError('Failed to add train. Please check console for details.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Add Train</h1>
      <form className="max-w-md w-full bg-white p-6 rounded shadow-md" onSubmit={handleAddTrain}>
        <input
          type="text"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Train Name"
          value={trainName}
          onChange={(e) => setTrainName(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="number"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Seat Capacity"
          value={seatCapacity}
          onChange={(e) => setSeatCapacity(e.target.value)}
          required
        />
        <input
          type="number"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Available Seats"
          value={availableSeats}
          onChange={(e) => setAvailableSeats(e.target.value)}
          required
        />
        <input
          type="time"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Arrival Time at Source"
          value={arrivalTimeAtSource}
          onChange={(e) => setArrivalTimeAtSource(e.target.value)}
          required
        />
        <input
          type="time"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Arrival Time at Destination"
          value={arrivalTimeAtDestination}
          onChange={(e) => setArrivalTimeAtDestination(e.target.value)}
          required
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition" type="submit">Add Train</button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AddTrainPage;
