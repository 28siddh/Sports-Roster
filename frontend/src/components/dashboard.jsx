import { useState } from 'react';

const samplePlayers = [
    { id: 1, fullName: 'Virat Kohli', contact: '9876543210', role: 'Batsman', status: 'Available' },
    { id: 2, fullName: 'Jasprit Bumrah', contact: '9123456780', role: 'Bowler', status: 'Unavailable' },
    { id: 3, fullName: 'Hardik Pandya', contact: '9555666777', role: 'All-Rounder', status: 'Available' }
];

function Dashboard({ onLogout }) {
    const [players, setPlayers] = useState(samplePlayers);
    const [fullName, setFullName] = useState('');
    const [contact, setContact] = useState('');
    const [role, setRole] = useState('Batsman');
    const [status, setStatus] = useState('Available');

    const handleAddPlayer = (e) => {
        e.preventDefault();

        const fakeNewPlayer = {
            id: Date.now(),
            fullName: fullName,
            contact: contact,
            role: role,
            status: status
        };

        setPlayers([...players, fakeNewPlayer]);

        setFullName('');
        setContact('');
        setRole('Batsman');
        setStatus('Available');
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
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
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
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
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

                    {players.map((player) => (
                        <div key={player.id} className="flex items-center justify-between bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                            <div>
                                <div className="flex items-center space-x-3">
                                    <h3 className="font-bold text-gray-900 text-lg">{player.fullName}</h3>
                                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${player.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {player.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Role: <span className="font-medium text-gray-700">{player.role}</span> | Contact: {player.contact}</p>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => console.log("Edit clicked for ID:", player.id)}
                                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => console.log("Delete clicked for ID:", player.id)}
                                    className="px-3 py-1.5 text-sm bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Dashboard;