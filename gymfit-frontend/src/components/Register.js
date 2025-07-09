import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [role, setRole] = useState('client');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        role,
        name,
        email,
        password
      });

      // Poți salva token-ul dacă backend-ul returnează unul
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      // Redirecționează către login sau dashboard
      navigate('/login');
    } catch (err) {
      console.error("Detalii eroare:", {
        message: err.message,
        response: err.response,
        stack: err.stack
      });

      if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError("Eroare de conexiune la server");
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Înregistrare</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className='register-form'>
        <div className='form-group'>
          <label className='form-label'>Rol:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className='form-input'>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='form-label'>Nume:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='form-input'
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='form-input'
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Parolă:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='form-input'
            required
          />
        </div>
        <button type="submit">Înregistrează-te</button>
      </form>
      <div className="login-link">
        Ai deja cont? <a href="/login">Autentifică-te aici</a>
      </div>
    </div>
  );
};

export default Register;
