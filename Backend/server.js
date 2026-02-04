import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import artisanRoutes from "./routes/artisanRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(cors());
// Increase payload limit for image uploads (base64 images can be large)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/artisans", artisanRoutes);

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Root route
app.get("/", (req, res) => {
    res.send("UdaanHub backend is running");
});

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler (must be last)
app.use(errorHandler);

// Server starting
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
