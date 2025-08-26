import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export function useAuthRedirect({ unauthenticatedRedirect = '/login' } = {}) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < Date.now()) {
                navigate(unauthenticatedRedirect);
            } else if (decoded.role === 'customer') {
                navigate('/booking');
            } else {
                navigate('/courts');
            }
        } else {
            navigate(unauthenticatedRedirect);
        }
    }, [navigate]);
}