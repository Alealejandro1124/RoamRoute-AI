/**
 * login.tsx
 *
 * Demonstrates a basic login form. On successful login,
 * a token is stored in localStorage and the user is redirected to the homepage.
 */

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
      // In many OAuth2 flows with FastAPI, we do form data with 'username' and 'password'
      const body = new URLSearchParams();
      body.append('grant_type', 'password');
      body.append('username', username);
      body.append('password', password);

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
      // e.g., { access_token: '...', token_type: 'bearer' }

      // Store the token
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', data.access_token);
      }

      // Redirect to main page
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
