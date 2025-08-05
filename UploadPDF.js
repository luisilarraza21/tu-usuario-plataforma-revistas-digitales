import React, { useState } from 'react';
import axios from 'axios';

function UploadPDF() {
  const [file, setFile] = React.useState(null);
  const [title, setTitle] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('title', title);

    try {
      const res = await axios.post('https://tu-backend.vercel.app/api/pdf/upload', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('PDF subido y convertido a flipbook con éxito. Enlace: ' + res.data.link);
    } catch (err) {
      alert('Error al subir el PDF');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Subir PDF</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título de la revista"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 mb-4 border"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Subir y Convertir</button>
      </form>
    </div>
  );
}

export default UploadPDF;
