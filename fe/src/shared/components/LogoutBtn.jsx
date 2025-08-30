import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const navigate = useNavigate();

    function handleLogout() {
        const answer = confirm('Bạn có chắc chắn muốn đăng xuất?');
        if (answer) {
            sessionStorage.removeItem('jwtToken');
            navigate('/login');
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
            Đăng xuất
        </button>
    );
}

export default LogoutBtn;