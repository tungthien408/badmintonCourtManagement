import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const navigate = useNavigate();
    function handleLogout() {
        const answer = confirm('Are you sure you want to log out?');
        if (answer) {
            sessionStorage.removeItem('jwtToken');
            navigate('/login');
        }
    }
    return (
        <button onClick={handleLogout}>Đăng xuất</button>
    )
}

export default LogoutBtn;