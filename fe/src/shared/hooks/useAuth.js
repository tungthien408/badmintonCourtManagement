import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const navigate = useNavigate();
    var token = null;
    async function login({ username, password }) {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                token = data['token'];
                sessionStorage.setItem('jwtToken', data['token']);
                // if user wants to stay login for longer => setup later
                const decoded = jwtDecode(data['token']);
                if (decoded.role === 'owner' || decoded.role === 'staff') navigate('/courts');
                else navigate('/booking');
                console.log('Login successfully')
            } else {
                alert(data.message || 'Login failed')
            }
        } catch (error) {
            alert('Login: Network error');
            console.log(error)
        }
    }
    return { token, login };
}