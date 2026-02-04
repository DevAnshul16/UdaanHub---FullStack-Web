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
router.get("/:id", getArtisanById);

// Protected routes (artisan only)
router.post("/", protect, authorizeRoles("artisan"), createArtisanProfile);
router.get("/me", protect, authorizeRoles("artisan"), getMyArtisanProfile);
router.put("/me", protect, authorizeRoles("artisan"), updateArtisanProfile);
router.delete("/me", protect, authorizeRoles("artisan"), deleteArtisanProfile);

export default router;
