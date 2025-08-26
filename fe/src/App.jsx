import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import CourtPage from './admin/components/CourtPage';
import LoginForm from './shared/components/LoginForm';
import BookingPage from './customer/components/BookingPage';
import RegisterPage from './customer/components/RegisterPage';
import { jwtDecode } from "jwt-decode";

function App() {
  const navigate = useNavigate();

  async function onLogin({ username, password }) {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        const token = data['token'];
        sessionStorage.setItem('jwtToken', token);
        // if user wants to stay login for longer => setup later
        const decoded = jwtDecode(token);
        if (decoded.role === 'owner' || decoded.role === 'staff') navigate('/courts');
        else navigate('/booking');
        console.log('Login successfully')
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (error) {
      alert('Login: Network error');
    }
  }

  async function onRegister({name, phone, email, username, password}) {
    console.log({ name, phone, email, username, password });
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, username, password })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful');
        return true;
      } else {
        alert(data.message || 'Registration failed');
        return 1;
      }
    } catch (error) {
      alert('Register Human: Network error');
      return 1;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<LoginForm onLogin={onLogin} />} />
      <Route path='/courts' element={<CourtPage />} />
      <Route path='/login' element={<LoginForm onLogin={onLogin} />} />
      <Route path='/booking' element={<BookingPage />} />
      <Route path='/register' element={<RegisterPage onLogin={onLogin} onRegister={onRegister} />} />
    </Routes>
  );
}

export default App;