import { useState } from 'react'
import './App.css'
import UserLogin from './components/login.jsx'

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
    return <div>Placeholder for the dashboard - .onLogout: {handleLogout.name}</div>;
  }

  if (view == 'signup') {
    return <div>Placeholder for the signup - onSignup: {handleLogout.name}</div>
  }

  return (
    <UserLogin
      onSubmitLogin={(user, pass) => {
        console.log("Form Submitted! Username:", user, "Password:", pass);
        handleLoginSuccess('test-token-123');
      }}
      onSwitchToRegister={() => setView('signup')}
      errorMessage={null}
    />
  )
}

export default App;
