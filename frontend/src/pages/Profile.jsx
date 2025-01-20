import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/profile.jpg';

export default function Profile() {
    const navigate = useNavigate();

    // Retrieve updated name and email from localStorage
    const username = localStorage.getItem('username') || 'John Doe'; // Default name
    const email = localStorage.getItem('email') || 'abc@gmail.com'; // Default email

    const shortEmail = '@' + username.substring(0, 4).toLowerCase() +'_';

    const handleEdit = () => {
        navigate('/profile/edit');
    };

    return (
        <div className="bg-gray-200 mt-16 h-96 rounded-lg flex justify-around items-center p-6 shadow-lg">
            <div className="w-60 h-60">
                <img
                    src={logo}
                    alt="profile_pic"
                    className="w-full h-full rounded-full object-cover border-2 border-gray-400"
                />
            </div>

            <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">{username}</p>
                <p className="text-gray-600 italic">{shortEmail}</p>

                <div className="flex justify-evenly mt-4 text-sm text-gray-700 space-x-8">
                    <div className="text-center">
                        <p className="font-semibold text-lg">156</p>
                        <p>Posts</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-lg">100</p>
                        <p>Public</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-lg">56</p>
                        <p>Private</p>
                    </div>
                </div>
                <button onClick={handleEdit} className="bg-gradient-to-br from-red-600 to-red-500 text-white rounded-md p-2 mt-5 w-64 hover:from-red-400 hover:to-red-600 transition-all duration-700 ease-in-out">
                    Edit
                </button>
            </div>
        </div>
    );
}
