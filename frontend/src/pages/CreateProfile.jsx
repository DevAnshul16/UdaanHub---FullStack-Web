import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { artisanAPI } from "../services/api";
import { getErrorMessage } from "../utils/errorHandler";

// Predefined skills list
const AVAILABLE_SKILLS = [
    "Tailoring",
    "Embroidery",
    "Mehndi Artist",
    "Makeup Artist",
    "Hair Styling",
    "Jewelry Making",
    "Pottery",
    "Painting",
    "Carpentry",
    "Woodworking",
    "Furniture Making",
    "Handicrafts",
    "Weaving",
    "Knitting",
    "Crochet",
    "Block Printing",
    "Textile Design",
    "Fashion Design",
    "Interior Design",
    "Graphic Design",
    "Photography",
    "Baking",
    "Cooking",
    "Catering",
    "Event Planning",
    "Floral Design",
    "Candle Making",
    "Soap Making",
    "Leather Work",
    "Metal Work",
    "Glass Work",
    "Beadwork",
    "Rangoli Art",
];

const CreateProfile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        profilePhoto: "",
        skills: [],
        description: "",
        location: "",
        price: "",
        phone: "",
        aadhaar: "",
    });
    const [photoPreview, setPhotoPreview] = useState("");
    const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Load existing profile on mount
    useEffect(() => {
        const loadProfile = async () => {
            try {
                console.log("🔍 Attempting to load profile...");
                const response = await artisanAPI.getMyProfile();
                const profile = response.data.profile;
                console.log("✅ Profile loaded successfully:", profile);
                setFormData({
                    profilePhoto: profile.profilePhoto || "",
                    skills: profile.skills || [],
                    description: profile.description || "",
                    location: profile.location || "",
                    price: profile.price || "",
                    phone: profile.phone || "",
                    aadhaar: profile.aadhaar || "",
                });
                if (profile.profilePhoto) {
                    setPhotoPreview(profile.profilePhoto);
                }
                setIsEdit(true);
                console.log("✅ isEdit set to true - Delete button should appear");
            } catch (err) {
                if (err.response?.status !== 404) {
                    console.error("❌ Error loading profile:", err);
                } else {
                    console.log("ℹ️ No existing profile found (404) - Creating new profile");
                }
            }
        };

        loadProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setError("Image size should be less than 2MB");
                return;
            }

            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
                setFormData({ ...formData, profilePhoto: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleSkill = (skill) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter((s) => s !== skill)
                : [...prev.skills, skill],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Validate required fields
            if (formData.skills.length === 0) {
                setError("Please select at least one skill");
                setLoading(false);
                return;
            }

            // Validate phone number if provided
            if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
                setError("Please enter a valid 10-digit phone number");
                setLoading(false);
                return;
            }

            // Validate Aadhaar if provided
            if (formData.aadhaar && !/^\d{12}$/.test(formData.aadhaar)) {
                setError("Please enter a valid 12-digit Aadhaar number");
                setLoading(false);
                return;
            }

            const profileData = {
                profilePhoto: formData.profilePhoto,
                skills: formData.skills,
                description: formData.description,
                location: formData.location,
                price: formData.price ? Number(formData.price) : undefined,
                phone: formData.phone,
                aadhaar: formData.aadhaar,
            };

            console.log("Submitting profile data:", {
                ...profileData,
                profilePhoto: profileData.profilePhoto ? `${profileData.profilePhoto.substring(0, 50)}...` : "No photo"
            });

            if (isEdit) {
                const response = await artisanAPI.updateProfile(profileData);
                console.log("Update response:", response.data);
            } else {
                const response = await artisanAPI.createProfile(profileData);
                console.log("Create response:", response.data);
            }

            navigate("/dashboard");
        } catch (err) {
            console.error("Profile save error:", err);
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProfile = async () => {
        setDeleting(true);
        setError("");

        try {
            await artisanAPI.deleteProfile();
            // Clear any stored profile data and redirect
            navigate("/dashboard");
        } catch (err) {
            console.error("Delete profile error:", err);
            setError(getErrorMessage(err));
            setShowDeleteModal(false);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 border border-gray-100 dark:border-gray-700 animate-fadeIn transition-colors duration-300">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg animate-bounce-slow">
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
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {isEdit ? "Update Your Profile" : "Create Your Profile"}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Showcase your skills and connect with clients
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 animate-slideIn">
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Profile Photo Upload */}
                        <div className="flex flex-col items-center">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
                                Profile Photo
                            </label>
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-200 shadow-lg group-hover:border-indigo-400 transition-all duration-300">
                                    {photoPreview ? (
                                        <img
                                            src={photoPreview}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                            <svg
                                                className="w-12 h-12 text-indigo-400"
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
                                    )}
                                </div>
                                <label
                                    htmlFor="photo-upload"
                                    className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition shadow-lg"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </label>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                                Upload a professional photo (Max 2MB)
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Skills Dropdown */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Skills <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-left flex items-center justify-between hover:border-indigo-300 dark:hover:border-indigo-500"
                                    >
                                        <span className="text-gray-700 dark:text-gray-200">
                                            {formData.skills.length > 0
                                                ? `${formData.skills.length} skill(s) selected`
                                                : "Select your skills"}
                                        </span>
                                        <svg
                                            className={`w-5 h-5 text-gray-400 transition-transform ${showSkillsDropdown ? "rotate-180" : ""
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {showSkillsDropdown && (
                                        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl max-h-64 overflow-y-auto animate-slideDown">
                                            {AVAILABLE_SKILLS.map((skill) => (
                                                <label
                                                    key={skill}
                                                    className="flex items-center px-4 py-3 hover:bg-indigo-50 dark:hover:bg-gray-600 cursor-pointer transition"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.skills.includes(skill)}
                                                        onChange={() => toggleSkill(skill)}
                                                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    />
                                                    <span className="ml-3 text-gray-700 dark:text-gray-200">{skill}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Selected Skills Display */}
                                {formData.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {formData.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-indigo-200 flex items-center gap-2 animate-fadeIn"
                                            >
                                                {skill}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSkill(skill)}
                                                    className="hover:text-red-600 transition"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    maxLength={10}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                    placeholder="10-digit mobile number"
                                />
                            </div>

                            {/* Aadhaar Number */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Aadhaar Number
                                </label>
                                <input
                                    type="text"
                                    name="aadhaar"
                                    value={formData.aadhaar}
                                    onChange={handleChange}
                                    maxLength={12}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                    placeholder="12-digit Aadhaar number"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                    placeholder="e.g., Mumbai, Maharashtra"
                                />
                            </div>

                            {/* Hourly Rate */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Hourly Rate (₹)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                    placeholder="e.g., 500"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    About You
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                                    placeholder="Tell clients about your experience, expertise, and what makes you unique..."
                                />
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4 pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin h-5 w-5 mr-3"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Saving...
                                    </span>
                                ) : isEdit ? (
                                    "Update Profile"
                                ) : (
                                    "Create Profile"
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 transition text-lg"
                            >
                                Cancel
                            </button>
                            {console.log("🔍 isEdit value:", isEdit, "- Delete button should", isEdit ? "SHOW" : "HIDE")}
                            {isEdit && (
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(true)}
                                    className="px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 hover:shadow-xl transition text-lg"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 animate-fadeIn">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full animate-slideDown">
                            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
                                Delete Profile?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                                Are you sure you want to delete your artisan profile? This action cannot be undone.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    disabled={deleting}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteProfile}
                                    disabled={deleting}
                                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-50"
                                >
                                    {deleting ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin h-5 w-5 mr-2"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="none"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Deleting...
                                        </span>
                                    ) : (
                                        "Delete Profile"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(-10px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default CreateProfile;
