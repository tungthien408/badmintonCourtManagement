import {useState} from 'react'

function LoginForm({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({username, password});
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;