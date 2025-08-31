import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../customer/components/Navbar';

const UsersPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        if (!token || token.split('.').length !== 3) {
          setError('Token không hợp lệ hoặc không tồn tại. Vui lòng đăng nhập lại.');
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Response text:', responseText);

        if (!response.ok) {
          if (response.status === 401) {
            setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            sessionStorage.removeItem('jwtToken');
            navigate('/login');
            return;
          }
          if (response.status === 403) {
            setError('Truy cập bị từ chối: Vai trò không đủ quyền.');
            return;
          }
          throw new Error(`Lỗi ${response.status}: ${responseText}`);
        }

        const data = JSON.parse(responseText);
        setUserData(data);
      } catch (error) {
        setError(error.message || 'Đã xảy ra lỗi khi lấy thông tin người dùng.');
        console.error('Lỗi:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <>
      <Navbar />
    <div style={{ padding: '20px' }}>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : userData ? (
        <div>
          <h1>Thông tin người dùng</h1>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Vai trò:</strong> {userData.role}</p>
          {userData.name && <p><strong>Tên:</strong> {userData.name}</p>}
        </div>
      ) : (
        <p>Đang tải thông tin...</p>
      )}
    </div>
    </>
  );
};

export default UsersPage;