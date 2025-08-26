import { useEffect, useState } from 'react';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import TextInput from './TextInput';

function LoginForm({ onLogin }) {
    useAuthRedirect();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({ username, password });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextInput label="Username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                <TextInput label="Password" id="password" value={password} type="password" onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <p>
                First time? <a href='./register'>Click here.</a>
            </p>
        </div>
    );
}

export default LoginForm;