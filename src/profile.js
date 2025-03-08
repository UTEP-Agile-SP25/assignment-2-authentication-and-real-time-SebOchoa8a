import { auth, db } from "./config.js";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Profile Page Loaded!");

    const addBookButton = document.getElementById("add-book");
    const bookTitleInput = document.getElementById("book-title");
    const bookAuthorInput = document.getElementById("book-author");
    const bookGenreInput = document.getElementById("book-genre"); // New input field
    const bookList = document.getElementById("book-list");

    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("User logged in as:", user.email);
        } else {
            console.warn("No user detected. Redirecting to login...");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        }
    });

    // Add Book with Genre Field
    addBookButton.addEventListener("click", async () => {
        const title = bookTitleInput.value.trim();
        const author = bookAuthorInput.value.trim();
        const genre = bookGenreInput.value.trim(); // Get genre input

        if (!title || !author || !genre) {
            alert("Please enter title, author, and genre.");
            return;
        }

        try {
            console.log(`Adding book: ${title} by ${author}, Genre: ${genre}`);
            const docRef = await addDoc(collection(db, "books"), {
                title: title,
                author: author,
                genre: genre, // New field added to Firestore
                userId: auth.currentUser?.uid,
            });
            console.log(`Book added with ID: ${docRef.id}`);
            bookTitleInput.value = "";
            bookAuthorInput.value = "";
            bookGenreInput.value = "";
        } catch (error) {
            console.error("Error adding book:", error);
        }
    });

    // ✅ Real-time Book Display with Genre Field
    onSnapshot(collection(db, "books"), (snapshot) => {
        bookList.innerHTML = "";
        snapshot.docs.forEach((doc) => {
            const book = doc.data();
            const listItem = document.createElement("li");
            listItem.textContent = `${book.title} by ${book.author} (Genre: ${book.genre}) (ID: ${doc.id})`;
            bookList.appendChild(listItem);
        });
    });
});
