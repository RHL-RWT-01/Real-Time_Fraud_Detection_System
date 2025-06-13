import React, { useState } from "react";

function Navbar() {
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <div>
            <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo and App Title */}
                    <div className="flex items-center space-x-3">
                        <img
                            src="/logo192.png"
                            alt="Logo"
                            className="h-8 w-8 rounded-full bg-white"
                        />
                        <span className="text-white text-lg font-semibold">
                            Transaction App
                        </span>
                    </div>
                    {/* Navigation Links */}
                    <div className="space-x-10 rounded-b-lg border-b-2 border-gray-700 space-y-4">
                        <a href="/" className="text-gray-300 hover:text-white">
                            Home
                        </a>
                        <a href="/transactions" className="text-gray-300 hover:text-white">
                            Transactions
                        </a>
                        <a href="/users" className="text-gray-300 hover:text-white">
                            Users
                        </a>
                        <a href="/reports" className="text-gray-300 hover:text-white">
                            Reports
                        </a>
                    </div>
                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center text-gray-300 hover:text-white focus:outline-none"
                        >
                            <span className="mr-2">Profile</span>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                                <a
                                    href="/profile"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    My Account
                                </a>
                                <a
                                    href="/settings"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Settings
                                </a>
                                <button
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                    onClick={() => alert("Logged out!")}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;