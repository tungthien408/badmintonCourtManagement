import { Routes, Route } from 'react-router-dom';
import CourtPage from './admin/components/CourtPage';
import LoginForm from './shared/components/LoginForm';
import BookingPage from './customer/components/BookingPage';
import RegisterPage from './customer/components/RegisterPage';

import useAuth from './shared/hooks/useAuth';
import useRegister from './customer/hooks/useRegister';

function App() {
  const { login } = useAuth();
  const { register } = useRegister();

  return (
    <Routes>
      <Route path="/" element={<BookingPage />} />
      <Route path='/courts' element={<CourtPage />} />
      <Route path='/login' element={<LoginForm onLogin={login} />} />
      <Route path='/booking' element={<BookingPage />} />
      <Route path='/users/me' element={<UsersPage />} />
      <Route path='/register' element={<RegisterPage onLogin={login} onRegister={register} />} />

      {/* <Route path='/logout' element={<LogoutBtn />} /> */}

    </Routes>
  );
}

export default App;