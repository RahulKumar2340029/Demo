import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const response = await fetch('http://localhost:3001/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            body: JSON.stringify(user) // Send the user object directly
        });

        if (response.ok) {
            navigate('/'); // Redirect to home or sign-in page
        } else {
            console.error('Registration failed');
            // Handle errors here (e.g., show an error message to the user)
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-2xl">
                    <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                onChange={handleChange}
                                value={user.username}
                                name="username"
                                type="text"
                                id="username"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                onChange={handleChange}
                                value={user.email}
                                name="email"
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                onChange={handleChange}
                                value={user.password}
                                name="password"
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p>
                        Already have an account?{' '}
                        <Link to="/signin" className="text-indigo-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
