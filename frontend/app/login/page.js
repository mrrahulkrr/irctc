"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', { username, password });
      const { user, token } = response.data; // Destructure user and token
    
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user)
      // You can store user details in local storage or state as needed

      console.log('User:', user);
      console.log('Token:', token);
      // Proceed with authentication or redirection
    } else {
      console.error('Token not found in response');
    }
      // Check user role
    //   const userResponse = await axios.get('http://localhost:8080/api/users/me', {
    //     headers: {
    //       'Authorization': `Bearer ${response.data.access_token}`
    //     }
    //   });
      const userRole = user.role;

      if (userRole === 'admin') {
        router.push('/trains/add'); // Redirect admin to add train page
      } else {
        router.push('/trains/availability'); // Redirect non-admin to check availability page
      }

    } catch (error) {
      setError('Incorrect username/password provided, Please retry');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <div className="max-w-md w-full bg-white p-6 rounded shadow-md">
        <input
          type="username"
          className="w-full mb-2 p-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;

