import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditPage() {
    const navigate = useNavigate();

    const [editUser, setEditUser] = useState({
        email: "",
        username: "",
    });

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/user/update?userId=678634e272423ae52dc2efaa', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editUser),
        });

        if (response.ok) {
            navigate('/profile');
        } else {
            console.error('Failed to update profile');
        }
    };

    const handleChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-gray-200 w-2/3 mt-16 h-96 rounded-lg flex justify-around items-center p-6 shadow-lg">
                <form onSubmit={handleUpdateProfile} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="abc@gmail.com"
                            value={editUser.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={editUser.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}
