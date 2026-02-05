import express from "express";
import {
    createArtisanProfile,
    getAllArtisanProfiles,
    getArtisanById,
    getMyArtisanProfile,
    updateArtisanProfile,
    deleteArtisanProfile,
} from "../controllers/artisanController.js";
import { protect } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roleAuth.js";

const router = express.Router();

// Public routes
router.get("/", getAllArtisanProfiles);

// Protected routes (artisan only) - MUST come before /:id
router.get("/me", protect, authorizeRoles("artisan"), getMyArtisanProfile);
router.post("/", protect, authorizeRoles("artisan"), createArtisanProfile);
router.put("/me", protect, authorizeRoles("artisan"), updateArtisanProfile);
router.delete("/me", protect, authorizeRoles("artisan"), deleteArtisanProfile);

// Public dynamic route - MUST come after /me
router.get("/:id", getArtisanById);

export default router;
