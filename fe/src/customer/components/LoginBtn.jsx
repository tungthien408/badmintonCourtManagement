import { useNavigate } from 'react-router-dom';

function LoginBtn() {
    const navigate = useNavigate();
    function handleLogin() {
        navigate('/login');
    }
    return (
        <a className="hover:text-[#EE5858] active:text-[#EE5858]" onClick={handleLogin}>Đăng nhập</a>
    )
}

export default LoginBtn;