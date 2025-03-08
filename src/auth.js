import { auth } from "./config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Register a new user
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Registration Error:", error.message);
    }
};

// Login a user
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Login Error:", error.message);
    }
};

// Logout user
document.getElementById("logout").addEventListener("click", async () => {
    try {
        await signOut(auth);
        console.log("User logged out. Redirecting...");
        setTimeout(() => {
            window.location.href = "index.html"; // Fixes logout redirection
        }, 1000);
    } catch (error) {
        console.error("Logout Error:", error.message);
    }
});