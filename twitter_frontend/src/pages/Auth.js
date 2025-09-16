import React, { useState } from 'react';
import { login, register } from '../services/api';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Auth() {
  /** Auth page for login/register with a simple toggle. */
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      if (mode === 'login') {
        await login({ username, password });
      } else {
        await register({ username, password, display_name: displayName });
      }
      navigate('/');
    } catch (error) {
      setErr(error?.message || 'Something went wrong');
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <h2 style={{ fontWeight: 800 }}>{mode === 'login' ? 'Sign in' : 'Create account'}</h2>
      <label style={{ display: 'block', marginTop: 12 }}>
        <span>Username</span>
        <input className="input" value={username} onChange={e => setUsername(e.target.value)} required />
      </label>
      {mode === 'register' && (
        <label style={{ display: 'block', marginTop: 12 }}>
          <span>Display name</span>
          <input className="input" value={displayName} onChange={e => setDisplayName(e.target.value)} />
        </label>
      )}
      <label style={{ display: 'block', marginTop: 12 }}>
        <span>Password</span>
        <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      {err && <div style={{ color: '#a7a7a7', marginTop: 8 }}>{err}</div>}
      <div className="form-actions">
        <button type="button" className="btn" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Create account' : 'Have an account? Sign in'}
        </button>
        <button type="submit" className="btn primary">{mode === 'login' ? 'Sign in' : 'Register'}</button>
      </div>
    </form>
  );
}
