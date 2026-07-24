import { useState } from 'react'
import './App.css'

function App() {
  const [view, setView] = useState('login')
  const [sessionToken, setSessionToken] = useState(null)

  const handleLoginSuccess = (token) => {
    setSessionToken(token);
    setView('dashboard');
  }

  const handleLogout = () => {
    setSessionToken(null);
    setView('login');
  }

  if (view == 'dashboard' && sessionToken) {
    return <div>Placeholder for the dashboard - onLogout: {handleLogout}</div>;
  }

  if (view == 'signup') {
    return <div>Placeholder for the signup - onSignup: {handleLogout}</div>
  }

  return <div>Placeholder for the login view</div>
}

export default App;
