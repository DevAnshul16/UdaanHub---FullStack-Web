import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-xl p-10 mb-10 text-white">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl font-bold border-2 border-white/30">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-1">
                                Welcome back, {user?.name}!
                            </h1>
                            <p className="text-indigo-100 text-lg">
                                You're logged in as <span className="font-semibold capitalize bg-white/20 px-3 py-1 rounded-lg">{user?.role}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Role-specific Content */}
                {user?.role === "artisan" ? (
                    <>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Create/Edit Profile Card */}
                            <Link
                                to="/create-profile"
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <svg
                                            className="w-7 h-7 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <svg className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                    Manage Profile
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Create or update your artisan profile to showcase your skills and attract clients
                                </p>
                            </Link>

                            {/* Browse Artisans Card */}
                            <Link
                                to="/"
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-500"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <svg
                                            className="w-7 h-7 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                    <svg className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                    Browse Artisans
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Discover other talented artisans and get inspired by their work
                                </p>
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Get Started</h2>
                        <div className="grid md:grid-cols-1 gap-6">
                            {/* Browse Artisans Card */}
                            <Link
                                to="/"
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <svg
                                            className="w-8 h-8 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <svg className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                    Find Talented Artisans
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                    Browse our community of skilled artisans and connect with the perfect professional for your project
                                </p>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
