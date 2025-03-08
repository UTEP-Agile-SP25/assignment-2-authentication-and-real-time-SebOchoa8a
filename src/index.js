import { registerUser, loginUser, logoutUser } from "./auth.js";
import { auth } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("JS Loaded and Event Listeners Attached!");

    const registerButton = document.getElementById("register");
    const loginButton = document.getElementById("login");
    const logoutButton = document.getElementById("logout");

    if (registerButton) {
        registerButton.addEventListener("click", async () => {
            const email = prompt("Enter email:");
            const password = prompt("Enter password:");
            await registerUser(email, password);
        });
    }

    if (loginButton) {
        loginButton.addEventListener("click", async () => {
            const email = prompt("Enter email:");
            const password = prompt("Enter password:");
            const user = await loginUser(email, password);
            if (user) {
                window.location.href = "profile.html"; // Redirect to profile after login
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", async () => {
            await logoutUser();
            console.log("User logged out.");
        });
    }
});
