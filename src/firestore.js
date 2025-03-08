import { db } from "./config.js";
import { doc, setDoc, addDoc, collection, deleteDoc, onSnapshot } from "firebase/firestore";

/**
 * Adds a newly registered user to Firestore under the "users" collection.
 * @param {Object} user - Firebase Auth user object.
 */
const addUserToDatabase = async (user) => {
    try {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "New User"
        });
        console.log("User successfully added to Firestore.");
    } catch (error) {
        console.error("Error adding user to Firestore:", error);
    }
};

/**
 * Adds a book or song entry to the Firestore "books" collection.
 * @param {string} title - Title of the book/song.
 * @param {string} author - Author/artist of the book/song.
 */
const addBook = async (title, author, userId = null) => {
    try {
        const bookData = { title, author };
        if (userId) bookData.userId = userId; // Link to user if available

        const docRef = await addDoc(collection(db, "books"), bookData);
        console.log(`Book added with ID: ${docRef.id}`);
    } catch (error) {
        console.error("Error adding book:", error);
    }
};

/**
 * Deletes a book or song entry from Firestore.
 * @param {string} id - Firestore document ID of the book/song to delete.
 */
const deleteBook = async (bookId) => {
    try {
        await deleteDoc(doc(db, "books", bookId));
        console.log(`Book with ID ${bookId} deleted.`);
    } catch (error) {
        console.error("Error deleting book:", error);
    }
};

/**
 * Creates three dummy users in the Firestore database for testing.
 */
const createDummyUsers = async () => {
    const dummyUsers = [
        { email: "user1@example.com", displayName: "User One" },
        { email: "user2@example.com", displayName: "User Two" },
        { email: "user3@example.com", displayName: "User Three" }
    ];
    dummyUsers.forEach(async (user, index) => {
        await addUserToDatabase({ uid: `dummy${index}`, email: user.email, displayName: user.displayName });
    });
};

export { addUserToDatabase, addBook, deleteBook, createDummyUsers };

