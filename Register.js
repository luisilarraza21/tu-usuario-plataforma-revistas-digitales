import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://tu-backend.vercel.app/api/auth/register', { email, password });
      alert('Usuario registrado con éxito');
      window.location.href = '/login';
    } catch (err) {
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Registrar Usuario</h2>
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
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
