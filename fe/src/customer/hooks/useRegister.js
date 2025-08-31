export default function useRegister() {
    async function register({ name, phone, email, username, password }) {
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, email, username, password })
            });
            const data = await response.json();
            if (response.ok) {
                return true;
            } else {
                alert(data.message || 'Registration failed');
                return false;
            }
        } catch (error) {
            alert('Register Human: Network error');
            return false;
        }
    }
    return { register };
}