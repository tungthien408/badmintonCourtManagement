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
        <form onSubmit={handleSubmit}>
            <TextInput label="Username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
            <TextInput label="Password" id="password" value={password} type="password" onChange={e => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;