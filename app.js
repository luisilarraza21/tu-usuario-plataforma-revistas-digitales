import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPDF from './components/UploadPDF';
import ViewFlipbook from './components/ViewFlipbook';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 text-white">
          <h1 className="text-2xl">Plataforma de Revistas Digitales</h1>
          {isAuthenticated && <a href="/upload" className="ml-4">Subir PDF</a>}
          {isAuthenticated ? (
            <button onClick={() => { localStorage.removeItem('token'); setIsAuthenticated(false); }} className="ml-4">Cerrar Sesión</button>
          ) : (
            <a href="/login" className="ml-4">Iniciar Sesión</a>
          )}
        </nav>
        <Routes>
          <Route path="/upload" element={<UploadPDF />} />
          <Route path="/flipbook/:id" element={<ViewFlipbook />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<h2 className="p-4">Bienvenido a la Plataforma de Revistas Digitales</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
