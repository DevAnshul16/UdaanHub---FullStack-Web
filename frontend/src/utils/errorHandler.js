// Utility function to get user-friendly error messages
export const getErrorMessage = (error) => {
    // If backend sent a message, use it
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    // Handle different HTTP status codes with user-friendly messages
    const status = error.response?.status;

    switch (status) {
        case 400:
            return "Invalid request. Please check your input and try again.";
        case 401:
            return "You are not authorized. Please login again.";
        case 403:
            return "You don't have permission to perform this action.";
        case 404:
            return "The requested resource was not found.";
        case 409:
            return "This item already exists. Please try with different details.";
        case 413:
            return "The file you're trying to upload is too large. Please use a smaller image.";
        case 422:
            return "The data you provided is invalid. Please check and try again.";
        case 429:
            return "Too many requests. Please wait a moment and try again.";
        case 500:
            return "Server error. Our team has been notified. Please try again later.";
        case 501:
            return "This feature is not yet implemented. Please contact support.";
        case 502:
            return "Bad gateway. The server is temporarily unavailable. Please try again.";
        case 503:
            return "Service temporarily unavailable. Please try again in a few minutes.";
        case 504:
            return "Request timeout. The server took too long to respond. Please try again.";
        default:
            break;
    }

    // Handle network errors
    if (error.message === "Network Error" || !error.response) {
        return "Network error. Please check your internet connection and try again.";
    }

    // Handle timeout errors
    if (error.code === "ECONNABORTED") {
        return "Request timeout. Please check your connection and try again.";
    }

    // Default fallback
    return "Something went wrong. Please try again later.";
};

// Specific error messages for common scenarios
export const ERROR_MESSAGES = {
    // Auth errors
    INVALID_CREDENTIALS: "Invalid email or password. Please try again.",
    EMAIL_EXISTS: "This email is already registered. Please login or use a different email.",
    WEAK_PASSWORD: "Password must be at least 6 characters long.",

    // Profile errors
    PROFILE_EXISTS: "You already have a profile. Please update your existing profile instead.",
    NO_PROFILE: "Profile not found. Please create a profile first.",
    IMAGE_TOO_LARGE: "Image size must be less than 2MB. Please use a smaller image.",
    INVALID_PHONE: "Please enter a valid 10-digit phone number.",
    INVALID_AADHAAR: "Please enter a valid 12-digit Aadhaar number.",

    // General errors
    REQUIRED_FIELD: "This field is required.",
    NETWORK_ERROR: "Unable to connect to server. Please check your internet connection.",
    SERVER_ERROR: "Server error. Please try again later.",
};
