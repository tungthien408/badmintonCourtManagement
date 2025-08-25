import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourtPage from './admin/components/CourtPage';
import LoginForm from './shared/components/LoginForm';

function App() {
  async function onLogin({username, password}) {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
      });
      const data = await response.json();
      if (response.ok) {
        // save token to somewhere
        // redirect/update UI
        console.log('Login successfully')
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (error) {
      alert('Network error');
    }
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={onLogin} />} />
        <Route path='/courts' element={<CourtPage />} />
        <Route path='/login' element={<LoginForm onLogin={onLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;