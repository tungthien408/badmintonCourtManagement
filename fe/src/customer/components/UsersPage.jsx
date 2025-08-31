import { useEffect, useState } from 'react';
import Navbar from '../../customer/components/Navbar';

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

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // if (!token || token.split('.').length !== 3) {
  //       //   setError('Token không hợp lệ hoặc không tồn tại. Vui lòng đăng nhập lại.');
  //       //   navigate('/login');
  //       //   return;
  //       // }

  //       const response = await fetch('http://localhost:5000/api/users/me', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // console.log('Response status:', response.status);
  //       // const responseText = await response.text();
  //       // console.log('Response text:', responseText);

  //       if (!response.ok) {
  //         if (response.status === 401) {
  //           setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
  //           sessionStorage.removeItem('jwtToken');
  //           navigate('/login');
  //           return;
  //         }
  //         if (response.status === 403) {
  //           setError('Truy cập bị từ chối: Vai trò không đủ quyền.');
  //           return;
  //         }
  //         throw new Error(`Lỗi ${response.status}: ${response.text()}`);
  //       }

  //       const data = JSON.parse(response.text());
  //       console.log(data);
  //       setUser(data);
  //     } catch (error) {
  //       setError(error.message || 'Đã xảy ra lỗi khi lấy thông tin người dùng.');
  //       console.error('Lỗi:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, [navigate]);

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