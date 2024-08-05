"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/signup', { username, password, role });
      localStorage.setItem('accessToken', response.data.access_token);
      console.log(username);
      router.push('/login'); // Redirect to login page after successful signup
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Signup</h1>
      <div className="max-w-md w-full bg-white p-6 rounded shadow-md">
        <input 
          type="text" 
          className="w-full mb-4 p-2 border rounded" 
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
        <select 
          className="w-full mb-4 p-2 border rounded" 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition" 
          onClick={handleSignup}
        >
          Signup
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default SignupPage;
