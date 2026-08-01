import { useState, useEffect } from "react";
import { API_BASE } from "../apiConfig";

function Dashboard({ token, onLogout }) {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [fullName, setFullName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [role, setRole] = useState('Batsman');
    const [isAvailable, setIsAvailable] = useState('Available');
    const [battingStyle, setBattingStyle] = useState('right-handed');
    const [bowlingStyle, setBowlingStyle] = useState('right-handed');

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch(`${API_BASE}/players`, {
                    method: 'GET',
                    headers: { authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (!response.ok) {
                    setError(data.message || 'Could not load players');
                    return;
                }
                setPlayers(data);
            } catch (error) {
                setError('Could not reach the server');
            } finally {
                setLoading(false);
            }
        };
        if (token) {
            fetchPlayers();
        }
    }, [token]);

    const handleAddPlayer = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch(`${API_BASE}/players`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    fullName,
                    contactNumber,
                    role: role.toLowerCase(),
                    isAvailable: isAvailable === 'Available',
                    bowlingStyle: bowlingStyle.toLowerCase(),
                    battingStyle: battingStyle.toLowerCase()
                }),
            });

            const newPlayer = await response.json();

            if (!response.ok) {
                setError(newPlayer.message || 'Failed to add player');
                return;
            }

            setPlayers([...players, newPlayer]);
            setFullName('');
            setContactNumber('');
            setRole('Batsman');
            setIsAvailable('Available');
            setBowlingStyle('right-handed');
            setBattingStyle('right-handed');
        } catch (err) {
            setError('Could not reach server to add player.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">

                <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900">🏏 Team Roster Dashboard</h1>
                        <p className="text-sm text-gray-500">Manage your squad availability and lineups</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg transition"
                    >
                        Log Out
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm">
                        {error}
                    </div>
                )}

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Player</h2>

                    <form onSubmit={handleAddPlayer} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Player Full Name"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                            <input
                                type="text"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                placeholder="Phone or Email"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                                >
                                    <option value="Batsman">Batsman</option>
                                    <option value="Bowler">Bowler</option>
                                    <option value="All-Rounder">All-Rounder</option>
                                    <option value="Wicket-Keeper">Wicket-Keeper</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Availability Status</label>
                                <select
                                    value={isAvailable}
                                    onChange={(e) => setIsAvailable(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Batting Style</label>
                                <select
                                    value={battingStyle}
                                    onChange={(e) => setBattingStyle(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                                >
                                    <option value="Right-handed">Right-handed</option>
                                    <option value="Left-handed">Left-handed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bowling Style</label>
                                <select
                                    value={bowlingStyle}
                                    onChange={(e) => setBowlingStyle(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                                >
                                    <option value="Right-handed">Right-handed</option>
                                    <option value="Left-handed">Left-handed</option>
                                    <option value="Pure-batsman">Pure-batsman</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow transition"
                        >
                            + Add Player to Squad
                        </button>
                    </form>
                </div>

                <div className="space-y-3">
                    <h2 className="text-lg font-bold text-gray-800">Current Squad ({players.length})</h2>

                    {loading ? (
                        <div className="text-center p-6 text-gray-500 font-medium">Loading squad from database...</div>
                    ) : players.length === 0 ? (
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-500">
                            No players found. Add your first player above!
                        </div>
                    ) : (
                        players.map((player) => (
                            <div key={player._id} className="flex items-center justify-between bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                                <div>
                                    <div className="flex items-center space-x-3">
                                        <h3 className="font-bold text-gray-900 text-lg">{player.fullName}</h3>
                                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${player.isAvailable === 'Available' || player.isAvailable === true
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {player.isAvailable === 'Available' || player.isAvailable === true ? 'Available' : 'Unavailable'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Role: <span className="font-medium text-gray-700">{player.role}</span> |
                                        Contact: {player.contactNumber || player.contact}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Batting: {player.battingStyle} | Bowling: {player.bowlingStyle}
                                    </p>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => console.log("Edit clicked for ID:", player._id)}
                                        className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => console.log("Delete clicked for ID:", player._id)}
                                        className="px-3 py-1.5 text-sm bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;