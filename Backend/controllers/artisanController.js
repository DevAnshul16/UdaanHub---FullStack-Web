import ArtisanProfile from "../models/ArtisanProfile.js";

// @desc    Create artisan profile
// @route   POST /api/artisans
// @access  Private (artisan only)
export const createArtisanProfile = async (req, res) => {
    try {
        const { profilePhoto, skills, description, location, price, phone, aadhaar } = req.body;

        // 1. Validation
        if (!skills || skills.length === 0) {
            return res.status(400).json({ message: "At least one skill is required" });
        }

        // 2. Check if profile already exists for this user
        const existingProfile = await ArtisanProfile.findOne({ user: req.user._id });
        if (existingProfile) {
            return res.status(400).json({
                message: "Profile already exists. Use update endpoint to modify your profile.",
            });
        }

        // 3. Create new profile
        const profile = await ArtisanProfile.create({
            user: req.user._id,
            profilePhoto,
            skills,
            description,
            location,
            price,
            phone,
            aadhaar,
        });

        // 4. Populate user data and return
        const populatedProfile = await ArtisanProfile.findById(profile._id).populate(
            "user",
            "name email"
        );

        res.status(201).json({
            message: "Artisan profile created successfully",
            profile: populatedProfile,
        });
    } catch (error) {
        console.error("Create profile error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Get all artisan profiles
// @route   GET /api/artisans
// @access  Public
export const getAllArtisanProfiles = async (req, res) => {
    try {
        const profiles = await ArtisanProfile.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 }); // Most recent first

        // Debug logging
        console.log("Fetched profiles count:", profiles.length);
        if (profiles.length > 0) {
            console.log("First profile has photo:", !!profiles[0].profilePhoto);
            console.log("First profile fields:", Object.keys(profiles[0].toObject()));
        }

        res.status(200).json({
            count: profiles.length,
            profiles,
        });
    } catch (error) {
        console.error("Get all profiles error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get artisan profile by ID
// @route   GET /api/artisans/:id
// @access  Public
export const getArtisanById = async (req, res) => {
    try {
        const profile = await ArtisanProfile.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (!profile) {
            return res.status(404).json({
                message: "Artisan profile not found",
            });
        }

        res.status(200).json({
            profile,
        });
    } catch (error) {
        console.error("Get artisan by ID error:", error);
        // Handle invalid ObjectId format
        if (error.kind === "ObjectId") {
            return res.status(404).json({ message: "Artisan profile not found" });
        }
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get logged-in artisan's profile
// @route   GET /api/artisans/me
// @access  Private (artisan only)
export const getMyArtisanProfile = async (req, res) => {
    try {
        const profile = await ArtisanProfile.findOne({ user: req.user._id }).populate(
            "user",
            "name email role"
        );

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found. Create a profile first.",
            });
        }

        res.status(200).json({
            profile,
        });
    } catch (error) {
        console.error("Get my profile error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Update artisan profile
// @route   PUT /api/artisans/me
// @access  Private (artisan only)
export const updateArtisanProfile = async (req, res) => {
    try {
        const { profilePhoto, skills, description, location, price, phone, aadhaar } = req.body;

        // 1. Find profile
        const profile = await ArtisanProfile.findOne({ user: req.user._id });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found. Create a profile first.",
            });
        }

        // 2. Update fields
        if (profilePhoto !== undefined) profile.profilePhoto = profilePhoto;
        if (skills !== undefined) {
            if (!skills || skills.length === 0) {
                return res.status(400).json({ message: "At least one skill is required" });
            }
            profile.skills = skills;
        }
        if (description !== undefined) profile.description = description;
        if (location !== undefined) profile.location = location;
        if (price !== undefined) {
            if (price < 0) {
                return res.status(400).json({ message: "Price must be a positive number" });
            }
            profile.price = price;
        }
        if (phone !== undefined) profile.phone = phone;
        if (aadhaar !== undefined) profile.aadhaar = aadhaar;

        // 3. Save and return
        await profile.save();

        const updatedProfile = await ArtisanProfile.findById(profile._id).populate(
            "user",
            "name email"
        );

        res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedProfile,
        });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Delete artisan profile
// @route   DELETE /api/artisans/me
// @access  Private (artisan only)
export const deleteArtisanProfile = async (req, res) => {
    try {
        const profile = await ArtisanProfile.findOne({ user: req.user._id });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }

        await ArtisanProfile.deleteOne({ _id: profile._id });

        res.status(200).json({
            message: "Profile deleted successfully",
        });
    } catch (error) {
        console.error("Delete profile error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
