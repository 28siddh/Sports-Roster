import { useState, useEffect } from "react";
import { API_BASE } from "../apiConfig";

function Dashboard({ token, onLogout }) {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [editingId, setEditingId] = useState(null);
    const [fullName, setFullName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [role, setRole] = useState('Batsman');
    const [isAvailable, setIsAvailable] = useState('Available');
    const [battingStyle, setBattingStyle] = useState('Right-handed');
    const [bowlingStyle, setBowlingStyle] = useState('Right-handed');

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

    const resetForm = () => {
        setEditingId(null);
        setFullName('');
        setContactNumber('');
        setRole('Batsman');
        setIsAvailable('Available');
        setBattingStyle('Right-handed');
        setBowlingStyle('Right-handed');
        setError(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        setError(null);
        setSubmitting(true);

        const isEditing = editingId !== null;
        const url = isEditing ? `${API_BASE}/players/${editingId}` : `${API_BASE}/players`;
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
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

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || `Failed to ${isEditing ? 'update' : 'add'} player`);
                return;
            }

            if (isEditing) {
                setPlayers(players.map((p) => p._id === editingId ? data : p));
            } else {
                setPlayers([...players, data]);
            }

            resetForm();
        } catch (err) {
            setError(`Could not reach server to ${isEditing ? 'update' : 'add'} player.`);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditClick = (player) => {
        setEditingId(player._id);
        setFullName(player.fullName);
        setContactNumber(player.contactNumber);
        setRole(player.role.charAt(0).toUpperCase() + player.role.slice(1));
        setIsAvailable(player.isAvailable ? 'Available' : 'Unavailable');
        setBattingStyle(player.battingStyle.charAt(0).toUpperCase() + player.battingStyle.slice(1));
        setBowlingStyle(player.bowlingStyle.charAt(0).toUpperCase() + player.bowlingStyle.slice(1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = async (playerId) => {
        if (!window.confirm("Are you sure you want to remove this player from the squad?")) return;

        try {
            const response = await fetch(`${API_BASE}/players/${playerId}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Failed to delete player');
                return;
            }

            setPlayers(players.filter((p) => p._id !== playerId));
            if (editingId === playerId) resetForm();

        } catch (err) {
            setError('Could not reach server to delete player.');
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
                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                        {editingId ? 'Edit Player' : 'Add New Player'}
                    </h2>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
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
                                    <option value="All-rounder">All-rounder</option>
                                    <option value="Wicket-keeper">Wicket-keeper</option>
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

                        <div className="flex space-x-3 pt-2">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`flex-1 font-bold py-3 rounded-lg shadow transition text-white ${submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {submitting ? 'Saving...' : editingId ? '✓ Update Player' : '+ Add Player to Squad'}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    disabled={submitting}
                                    className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg shadow transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
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
                                        Role: <span className="font-medium text-gray-700">{player.role.charAt(0).toUpperCase() + player.role.slice(1)}</span> |
                                        Contact: {player.contactNumber}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Batting: {player.battingStyle.charAt(0).toUpperCase() + player.battingStyle.slice(1)} |
                                        Bowling: {player.bowlingStyle.charAt(0).toUpperCase() + player.bowlingStyle.slice(1)}
                                    </p>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditClick(player)}
                                        className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(player._id)}
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