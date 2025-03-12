import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiFetch } from './_app';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // In many FastAPI OAuth2 setups, the endpoint expects form data:
      // 'grant_type=password', 'username=...', 'password=...'
      const body = new URLSearchParams();
      body.append('grant_type', 'password');
      body.append('username', username);
      body.append('password', password);

      // Override default JSON content-type for form data
      const response = await apiFetch('http://127.0.0.1:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.detail || 'Login failed. Please check your credentials.');
        return;
      }

      const data = await response.json();
      // data should look like: { access_token: '...', token_type: 'bearer' }

      // Store the token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', data.access_token);
      }

      // Redirect to the main page upon successful login
      router.push('/');
    } catch (err) {
      console.error(err);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
