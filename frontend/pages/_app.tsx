import { AppProps } from 'next/app';
import '../styles/globals.css';

// A simple fetch wrapper that attaches the token if present
export async function apiFetch(url: string, options: RequestInit = {}) {
  // Attempt to read the token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  // Merge default headers with any passed-in headers
  const headers: Record<string, string> = {
    ...options.headers as Record<string, string>, // preserve any custom headers
  };

  // If no Content-Type is specified, default to JSON
  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // If we have a token, attach it as a Bearer token
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const finalOptions = {
    ...options,
    headers,
  };

  const res = await fetch(url, finalOptions);
  return res;
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
