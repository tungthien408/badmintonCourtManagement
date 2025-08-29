import { useNavigate } from 'react-router-dom';

function LoginBtn() {
    const navigate = useNavigate();
    function handleLogin() {
        navigate('/login');
    }
    return (
        <button onClick={handleLogin}>Đăng nhập</button>
    )
}

export default LoginBtn;