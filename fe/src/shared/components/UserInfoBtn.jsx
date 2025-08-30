import { useNavigate } from 'react-router-dom';

function UserInfoBtn() {
    const navigate = useNavigate();

    function handleProfile() {
        navigate('/users/me');
    }

    return (
        <button
            onClick={handleProfile}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
            Thông tin cá nhân
        </button>
    );
}

export default UserInfoBtn;