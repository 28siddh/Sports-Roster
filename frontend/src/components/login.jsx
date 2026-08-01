import { useState } from 'react';

function Login({ onLogin, errorMessage, submitting }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (submitting) return;
        onLogin(username, password);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">🏏 Team Login</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign in to manage your roster</p>
                </div>

                {errorMessage && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full font-bold py-3 rounded-lg shadow transition text-white ${submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {submitting ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;