import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'; // Adaugă această linie de import
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';

function App() {
  // Mută funcția handleLogin în interiorul componentei
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5129/api/auth/register', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Transmitem handleLogin ca prop către componenta Login */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;