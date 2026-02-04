import { Link } from "react-router-dom";

const ArtisanCard = ({ profile }) => {
    console.log("ArtisanCard profile data:", {
        name: profile.user?.name,
        hasPhoto: !!profile.profilePhoto,
        photoPreview: profile.profilePhoto ? `${profile.profilePhoto.substring(0, 50)}...` : "No photo"
    });

    return (
        <Link to={`/artisan/${profile._id}`} className="block">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group transform hover:-translate-y-2 cursor-pointer">
                {/* Header with gradient */}
                <div className="h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                    <div className="absolute -bottom-12 left-6">
                        <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-2xl shadow-xl flex items-center justify-center border-4 border-white dark:border-gray-600 overflow-hidden">
                            {profile.profilePhoto ? (
                                <img
                                    src={profile.profilePhoto}
                                    alt={profile.user?.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-3xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    {profile.user?.name?.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="pt-16 px-6 pb-6">
                    {/* Artisan Name */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900 mb-1">
                        {profile.user?.name || "Unknown Artisan"}
                    </h3>

                    {/* Email */}
                    <p className="text-sm text-gray-500 dark:text-gray-900 mb-1">{profile.user?.email}</p>

                    {/* Phone */}
                    {profile.phone && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                            <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="font-medium">{profile.phone}</span>
                        </div>
                    )}

                    {/* Skills */}
                    <div className="mb-5">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-900 uppercase tracking-wide mb-2.5">
                            Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills?.slice(0, 4).map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-indigo-100"
                                >
                                    {skill}
                                </span>
                            ))}
                            {profile.skills?.length > 4 && (
                                <span className="bg-gray-100 text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium">
                                    +{profile.skills.length - 4} more
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    {profile.description && (
                        <p className="text-gray-600 dark:text-gray-900 text-sm mb-5 line-clamp-2 leading-relaxed">
                            {profile.description}
                        </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        {profile.location && (
                            <div className="flex items-center text-gray-600 dark:text-gray-800">
                                <svg
                                    className="w-4 h-4 mr-1.5 text-indigo-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="text-sm font-medium">{profile.location}</span>
                            </div>
                        )}

                        {profile.price && (
                            <div className="flex items-center space-x-1">
                                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    ₹{profile.price}
                                </span>
                                <span className="text-sm text-gray-500 font-medium">/hr</span>
                            </div>
                        )}
                    </div>

                    {/* Verification Badge */}
                    {profile.aadhaar && (
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center text-green-600 text-sm">
                                <svg className="w-5 h-5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold">Aadhaar Verified</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ArtisanCard;
