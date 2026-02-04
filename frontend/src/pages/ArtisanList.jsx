import { useState, useEffect } from "react";
import { artisanAPI } from "../services/api";
import ArtisanCard from "../components/ArtisanCard";

const ArtisanList = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await artisanAPI.getAllProfiles();
                setProfiles(response.data.profiles);
            } catch (err) {
                setError("Failed to load artisan profiles");
                console.error("Error fetching profiles:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Loading artisans...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Discover Talented Artisans
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
                        Connect with skilled artisans for your projects. Find the perfect match for your needs.
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-12 mt-12">
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-1">{profiles.length}+</div>
                            <div className="text-indigo-200 text-sm">Artisans</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-1">50+</div>
                            <div className="text-indigo-200 text-sm">Skills</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-1">100%</div>
                            <div className="text-indigo-200 text-sm">Verified</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-8 shadow-sm">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    </div>
                )}

                {/* Artisan Grid */}
                {profiles.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 max-w-md mx-auto border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg
                                    className="w-12 h-12 text-indigo-600 dark:text-indigo-400"
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
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                                No Artisans Yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Be the first to create an artisan profile and showcase your skills!
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Featured Artisans
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Showing <span className="font-semibold text-indigo-600 dark:text-indigo-400">{profiles.length}</span> talented artisan{profiles.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {profiles.map((profile) => (
                                <ArtisanCard key={profile._id} profile={profile} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ArtisanList;
