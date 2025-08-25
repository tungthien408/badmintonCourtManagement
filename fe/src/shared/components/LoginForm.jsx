import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function LoginForm({ onLogin }) {
    const navigate = useNavigate();
    // verify JWT Token

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < Date.now()) {
                console.log("navigated from login => login", Date.now() - decoded.date);
                navigate('/login');
            } else if (decoded.role === 'customer') {
                navigate('/booking');
            } else {
                navigate('/courts');
            }
        }
    }, [navigate]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({ username, password });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ padding: "10px" }}>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div style={{ padding: "10px" }}>
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;