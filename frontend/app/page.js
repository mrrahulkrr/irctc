// frontend/app/page.js
import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Railway Management System</h1>
      <p className="text-lg text-center mb-8">Your one-stop solution for train bookings and availability checks.</p>
      <div className="space-x-4">
        <a href="/trains" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Check Train Availability</a>
        <a href="/book" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">Book a Seat</a>
      </div>
    </div>
  );
};

export default HomePage;
