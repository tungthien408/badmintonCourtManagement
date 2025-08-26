import '../../App.css';
import { useAuthRedirect } from '../../shared/hooks/useAuthRedirect';
import { useState } from 'react';
import TextInput from '../../shared/components/TextInput';
import { useNavigate } from 'react-router-dom';


function RegisterPage({ onLogin, onRegister }) {
    const navigate = useNavigate();
    useAuthRedirect({ unauthenticatedRedirect: '/register' });
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (password === repassword) {
            const success = await onRegister({ name, phone, email, username, password })
            if (success) {
                onLogin({ username, password });
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextInput label="Name" id="name" value={name} onChange={e => setName(e.target.value)} />
                    <TextInput label="Phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)} pattern="^0(2|3|5|7|8|9)[0-9]{8}$" />
                    <TextInput label="Email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required={false} />
                </div>
                <div>
                    <TextInput label="Username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                    <TextInput label="Password" id="password" value={password} type="password" onChange={e => setPassword(e.target.value)} />
                    <TextInput label="Re-Password" id="repassword" value={repassword} type="password" onChange={e => setRepassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Have an account? <a href='./login'>Click here.</a>
            </p>
        </div>
    );
}

export default RegisterPage;