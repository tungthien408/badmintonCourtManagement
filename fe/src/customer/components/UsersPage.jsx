import { useEffect, useState } from 'react';
import Navbar from '../layouts/Navbar';

export default function UsersPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('jwtToken');

  useEffect(() => {
    fetch('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => response.json())
        .then(data => {
          setUser(data.human)
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
        })
  }, [])

  return (
    <>
      <Navbar />
    <div style={{ padding: '20px' }}>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : 
      user ? (
        <div>
          <h1>Thông tin người dùng</h1>
          <p><strong>Tên:</strong> {user.name}</p>
          <p><strong>SĐT:</strong> {user.phone}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* <p><strong>Vai trò:</strong> {user.role}</p> */}
          {/* {user.name && <p><strong>Tên:</strong> {user.name}</p>} */}
        </div>
      ) : (
        <p>Đang tải thông tin...</p>
      )}
    </div>
    </>
  );
};