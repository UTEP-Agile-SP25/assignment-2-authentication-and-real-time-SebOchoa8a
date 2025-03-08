import { db } from "./config.js";
import { collection, onSnapshot } from "firebase/firestore";

/**
 * Listens for real-time updates and displays books on the webpage.
 */
const listenForBooks = () => {
    const bookList = document.getElementById("book-list");

    onSnapshot(collection(db, "books"), (snapshot) => {
        bookList.innerHTML = ""; // Clear list before updating

        snapshot.docs.forEach((doc) => {
            const book = doc.data();
            const listItem = document.createElement("li");
            listItem.textContent = `${book.title} by ${book.author}`;
            bookList.appendChild(listItem);
        });
    });
};

// Start listening for real-time updates
listenForBooks();
