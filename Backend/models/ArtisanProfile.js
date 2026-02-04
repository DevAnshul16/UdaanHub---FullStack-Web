import mongoose from "mongoose";

const artisanProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // One profile per artisan
        },
        profilePhoto: {
            type: String, // URL or base64 string
            default: "",
        },
        skills: {
            type: [String],
            required: [true, "At least one skill is required"],
            validate: {
                validator: function (skills) {
                    return skills && skills.length > 0;
                },
                message: "Skills array must have at least one skill",
            },
        },
        description: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            min: [0, "Price must be a positive number"],
        },
        phone: {
            type: String,
            trim: true,
            validate: {
                validator: function (phone) {
                    return !phone || /^[6-9]\d{9}$/.test(phone);
                },
                message: "Please enter a valid 10-digit Indian phone number",
            },
        },
        aadhaar: {
            type: String,
            trim: true,
            validate: {
                validator: function (aadhaar) {
                    return !aadhaar || /^\d{12}$/.test(aadhaar);
                },
                message: "Aadhaar must be a 12-digit number",
            },
        },
    },
    { timestamps: true }
);

// Index for faster queries
artisanProfileSchema.index({ user: 1 });

const ArtisanProfile = mongoose.model("ArtisanProfile", artisanProfileSchema);
export default ArtisanProfile;
