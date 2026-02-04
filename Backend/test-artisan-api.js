// Test script for ArtisanProfile CRUD API
// Run this script with: node test-artisan-api.js

import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

// Test data
let artisanToken = "";
let clientToken = "";
let artisanUserId = "";
let clientUserId = "";

// Helper function to log results
const log = (message, data = null) => {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`✓ ${message}`);
    if (data) {
        console.log(JSON.stringify(data, null, 2));
    }
};

const logError = (message, error) => {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`✗ ${message}`);
    console.log(`Error: ${error.response?.data?.message || error.message}`);
};

// Test functions
async function registerArtisan() {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, {
            name: "John Artisan",
            email: `artisan_${Date.now()}@test.com`,
            password: "password123",
            role: "artisan",
        });
        artisanToken = response.data.token;
        artisanUserId = response.data.user.id;
        log("Artisan registered successfully", response.data);
    } catch (error) {
        logError("Failed to register artisan", error);
        throw error;
    }
}

async function registerClient() {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, {
            name: "Jane Client",
            email: `client_${Date.now()}@test.com`,
            password: "password123",
            role: "client",
        });
        clientToken = response.data.token;
        clientUserId = response.data.user.id;
        log("Client registered successfully", response.data);
    } catch (error) {
        logError("Failed to register client", error);
        throw error;
    }
}

async function createArtisanProfile() {
    try {
        const response = await axios.post(
            `${BASE_URL}/artisans`,
            {
                skills: ["Carpentry", "Woodworking", "Furniture Making"],
                description: "Expert carpenter with 10 years of experience",
                location: "New York, NY",
                price: 50,
            },
            {
                headers: { Authorization: `Bearer ${artisanToken}` },
            }
        );
        log("Artisan profile created successfully", response.data);
    } catch (error) {
        logError("Failed to create artisan profile", error);
        throw error;
    }
}

async function testDuplicateProfileCreation() {
    try {
        await axios.post(
            `${BASE_URL}/artisans`,
            {
                skills: ["Plumbing"],
                description: "Second profile attempt",
                location: "Boston, MA",
                price: 60,
            },
            {
                headers: { Authorization: `Bearer ${artisanToken}` },
            }
        );
        logError("Duplicate profile creation should have failed", new Error("No error thrown"));
    } catch (error) {
        if (error.response?.status === 400) {
            log("✓ Duplicate profile creation correctly prevented", error.response.data);
        } else {
            logError("Unexpected error during duplicate profile test", error);
        }
    }
}

async function testClientCannotCreateProfile() {
    try {
        await axios.post(
            `${BASE_URL}/artisans`,
            {
                skills: ["Painting"],
                description: "Client trying to create profile",
                location: "Chicago, IL",
                price: 40,
            },
            {
                headers: { Authorization: `Bearer ${clientToken}` },
            }
        );
        logError("Client should not be able to create profile", new Error("No error thrown"));
    } catch (error) {
        if (error.response?.status === 403) {
            log("✓ Client correctly denied from creating profile", error.response.data);
        } else {
            logError("Unexpected error during client authorization test", error);
        }
    }
}

async function getAllProfiles() {
    try {
        const response = await axios.get(`${BASE_URL}/artisans`);
        log(`Retrieved ${response.data.count} artisan profiles`, response.data);
    } catch (error) {
        logError("Failed to get all profiles", error);
        throw error;
    }
}

async function getMyProfile() {
    try {
        const response = await axios.get(`${BASE_URL}/artisans/me`, {
            headers: { Authorization: `Bearer ${artisanToken}` },
        });
        log("Retrieved my artisan profile", response.data);
    } catch (error) {
        logError("Failed to get my profile", error);
        throw error;
    }
}

async function updateMyProfile() {
    try {
        const response = await axios.put(
            `${BASE_URL}/artisans/me`,
            {
                skills: ["Carpentry", "Woodworking", "Furniture Making", "Cabinet Making"],
                description: "Expert carpenter with 10 years of experience. Specializing in custom furniture.",
                location: "Brooklyn, NY",
                price: 65,
            },
            {
                headers: { Authorization: `Bearer ${artisanToken}` },
            }
        );
        log("Profile updated successfully", response.data);
    } catch (error) {
        logError("Failed to update profile", error);
        throw error;
    }
}

async function testClientCannotGetArtisanProfile() {
    try {
        await axios.get(`${BASE_URL}/artisans/me`, {
            headers: { Authorization: `Bearer ${clientToken}` },
        });
        logError("Client should not be able to access /me endpoint", new Error("No error thrown"));
    } catch (error) {
        if (error.response?.status === 403) {
            log("✓ Client correctly denied from accessing /me endpoint", error.response.data);
        } else if (error.response?.status === 404) {
            log("✓ Client has no profile (expected)", error.response.data);
        } else {
            logError("Unexpected error during client /me test", error);
        }
    }
}

async function deleteMyProfile() {
    try {
        const response = await axios.delete(`${BASE_URL}/artisans/me`, {
            headers: { Authorization: `Bearer ${artisanToken}` },
        });
        log("Profile deleted successfully", response.data);
    } catch (error) {
        logError("Failed to delete profile", error);
        throw error;
    }
}

async function testGetDeletedProfile() {
    try {
        await axios.get(`${BASE_URL}/artisans/me`, {
            headers: { Authorization: `Bearer ${artisanToken}` },
        });
        logError("Getting deleted profile should have failed", new Error("No error thrown"));
    } catch (error) {
        if (error.response?.status === 404) {
            log("✓ Deleted profile correctly returns 404", error.response.data);
        } else {
            logError("Unexpected error during deleted profile test", error);
        }
    }
}

// Main test runner
async function runTests() {
    console.log("\n" + "=".repeat(60));
    console.log("🚀 STARTING ARTISAN PROFILE API TESTS");
    console.log("=".repeat(60));

    try {
        // Setup
        console.log("\n📋 SETUP: Registering test users");
        await registerArtisan();
        await registerClient();

        // Create profile
        console.log("\n📋 TEST: Create artisan profile");
        await createArtisanProfile();

        // Test duplicate prevention
        console.log("\n📋 TEST: Prevent duplicate profile creation");
        await testDuplicateProfileCreation();

        // Test role authorization
        console.log("\n📋 TEST: Client cannot create profile");
        await testClientCannotCreateProfile();

        // Read operations
        console.log("\n📋 TEST: Get all profiles (public)");
        await getAllProfiles();

        console.log("\n📋 TEST: Get my profile");
        await getMyProfile();

        // Update operation
        console.log("\n📋 TEST: Update my profile");
        await updateMyProfile();

        // Test client access
        console.log("\n📋 TEST: Client cannot access /me endpoint");
        await testClientCannotGetArtisanProfile();

        // Delete operation
        console.log("\n📋 TEST: Delete my profile");
        await deleteMyProfile();

        // Test deleted profile
        console.log("\n📋 TEST: Verify profile is deleted");
        await testGetDeletedProfile();

        console.log("\n" + "=".repeat(60));
        console.log("✅ ALL TESTS COMPLETED SUCCESSFULLY!");
        console.log("=".repeat(60) + "\n");
    } catch (error) {
        console.log("\n" + "=".repeat(60));
        console.log("❌ TESTS FAILED");
        console.log("=".repeat(60) + "\n");
        process.exit(1);
    }
}

// Run tests
runTests();
