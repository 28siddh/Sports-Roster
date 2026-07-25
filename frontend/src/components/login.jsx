import { useState } from "react";

function UserLogin({ onSubmitLogin, onSwitchToRegister, errorMessage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password)
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">🏏 Sports Roster</h1>
                    <p className="text-gray-500 mt-2 text-sm">Sign in to manage your team roster</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errorMessage &&
                        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                            {errorMessage}
                        </div>}
                    <button type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    New to Sports Roster?{' '}
                    <button type="button"
                        onClick={onSwitchToRegister}
                        className="text-blue-600 font-semibold hover:underline">
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserLogin;