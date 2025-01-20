import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Navbar() {
    const location = useLocation(); // Get the current route
    const navigate = useNavigate();
    const [cookieAvail, setCookieAvail] = useState(false);
    

    const handleSignIn = () => {
        navigate("/signin");
    };

    

    return (
        <div>
            <nav className="bg-white/30 backdrop-blur-md border-gray-200 dark:bg-gray-900/30 shadow-md fixed top-0 left-0 w-full z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Post<span className="text-blue-600">ify</span>
                        </span>
                    </a>

                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white/30 backdrop-blur-md md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800/30 md:dark:bg-gray-900/30 dark:border-gray-700">
                            <li>
                                <Link
                                    to="/"
                                    className={`block py-2 px-3 rounded ${
                                        location.pathname === "/" 
                                            ? "text-blue-700 dark:text-blue-500 border-b-2 border-blue-700 dark:border-blue-500"
                                            : "text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                                    }`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/myposts"
                                    className={`block py-2 px-3 rounded ${
                                        location.pathname === "/myposts" 
                                            ? "text-blue-700 dark:text-blue-500 border-b-2 border-blue-700 dark:border-blue-500"
                                            : "text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                                    }`}
                                >
                                    MyPosts
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className={`block py-2 px-3 rounded ${
                                        location.pathname === "/profile" 
                                            ? "text-blue-700 dark:text-blue-500 border-b-2 border-blue-700 dark:border-blue-500"
                                            : "text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                                    }`}
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/compose"
                                    className={`block py-2 px-3 rounded ${
                                        location.pathname === "/compose" 
                                            ? "text-blue-700 dark:text-blue-500 border-b-2 border-blue-700 dark:border-blue-500"
                                            : "text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                                    }`}
                                >
                                    Compose
                                </Link>
                            </li>
                            <li>
                                <motion.button
                                    onClick={handleSignIn}
                                    whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-400 transition-all duration-300 ease-in-out"
                                >
                                    Signin
                                </motion.button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
