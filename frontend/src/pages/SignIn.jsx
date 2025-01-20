import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


export default function SignIn() {
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const [user, setLocalUser] = useState({
        email: '',
        password: '',
    });
    console.log("user",user);

    
    

    const handleChange = (e) => {
        setLocalUser({ ...user, [e.target.name]: e.target.value });
        
    };

    const handleSignIn = async (e) => {
        e.preventDefault(); // Prevents page reload on form submission
        try {
            const response = await fetch('http://localhost:3001/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies
                body: JSON.stringify(user), // Do not wrap in another object
            });

            if (response.ok) {
                // Optionally, handle response data
                const data = await response.json();
                setUser(data.user); // Set user context
                console.log('Sign-in successful:', data);
                navigate('/'); // Redirect to home page
            } else {
                console.error('Sign-in failed:', response.status);
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-2xl">
                    <h2 className="text-2xl font-bold text-center">Sign In</h2>
                    <form className="space-y-4" onSubmit={handleSignIn}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                required
                                onChange={handleChange}
                                value={user.email}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                required
                                onChange={handleChange}
                                value={user.password}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    type="checkbox"
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label
                                    htmlFor="remember_me"
                                    className="block ml-2 text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign In
                            </button>
                        </div>
                        <p>
                            Not having an account?{' '}
                            <Link
                                to="/signup"
                                className="text-indigo-600 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
