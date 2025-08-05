import React, { useState } from 'react';
import axios from 'axios';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://tu-backend.vercel.app/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      window.location.href = '/';
    } catch (err) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
