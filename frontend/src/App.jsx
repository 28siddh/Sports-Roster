import { useState } from 'react'
import './App.css'
import { API_BASE } from './apiConfig.js'
import UserLogin from './components/login.jsx'
import UserRegister from './components/register.jsx'
import Dashboard from './components/dashboard.jsx';

function App() {
  const [view, setView] = useState('login')
  const [sessionToken, setSessionToken] = useState(null)
  const [loginError, setLoginError] = useState(null)
  const [registerError, setRegisterError] = useState(null)

  const handleLogin = async (username, password) => {
    setLoginError(null);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.message || 'Login Failed');
        return;
      }

      setSessionToken(data.token);
      setView('dashboard');
    } catch (error) {
      setLoginError("Could not reach the server");
    }
  }

  const handleLogout = () => {
    setSessionToken(null);
    setView('login')
  }

  const handleRegister = async (username, password) => {
    setRegisterError(null);

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setRegisterError(data.message || 'Registration Failed.')
        return;
      }
      setView('login');
    } catch (error) {
      setRegisterError('Could not reach the server')
    }
  }

  if (view === 'signup') {
    return (
      <UserRegister
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setLoginError(null);
          setView('login')
        }}
        errorMessage={registerError}
      />
    )
  }

  if (view === 'dashboard' && sessionToken) {
    return <Dashboard onLogout={handleLogout} token={sessionToken} />;
  }

  return (
    <UserLogin
      onSubmitLogin={handleLogin}
      onSwitchToRegister={() => {
        setRegisterError(null);
        setView('signup');
      }}
      errorMessage={loginError}
    />
  );
}

export default App;