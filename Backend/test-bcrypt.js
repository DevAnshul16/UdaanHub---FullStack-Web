import bcryptjs from "bcryptjs";

console.log("bcryptjs:", bcryptjs);
console.log("genSalt:", bcryptjs.genSalt);
console.log("hash:", bcryptjs.hash);
console.log("compare:", bcryptjs.compare);

async function test() {
    try {
        const salt = await bcryptjs.genSalt(10);
        console.log("Salt generated:", salt);
        const hash = await bcryptjs.hash("test123", salt);
        console.log("Hash generated:", hash);
    } catch (error) {
        console.error("Error:", error);
    }
}

test();
