import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const testRegistration = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Try to create a user
        const user = await User.create({
            name: "Test User",
            email: "standalone@test.com",
            password: "password123",
            role: "client"
        });

        console.log("User created successfully:");
        console.log({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });

        await mongoose.connection.close();
        console.log("Test completed successfully!");
    } catch (error) {
        console.error("Error during test:");
        console.error("Message:", error.message);
        console.error("Name:", error.name);
        console.error("Stack:", error.stack);

        // Write full error to file
        const fs = await import('fs');
        fs.default.writeFileSync('error-log.txt', `
Error Name: ${error.name}
Error Message: ${error.message}
Error Stack: ${error.stack}
        `);

        await mongoose.connection.close();
        process.exit(1);
    }
};

testRegistration();
