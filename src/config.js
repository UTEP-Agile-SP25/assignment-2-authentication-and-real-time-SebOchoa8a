
  import { initializeApp } from "firebase/app";
  import { getAuth, browserSessionPersistence, setPersistence } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";
  
  const firebaseConfig = {
    apiKey: "AIzaSyAt87dd-u6d8OdPxFh984atD4YxdXfTs7s",
    authDomain: "ochoa-sandbox-91f5c.firebaseapp.com",
    projectId: "ochoa-sandbox-91f5c",
    storageBucket: "ochoa-sandbox-91f5c.firebasestorage.app",
    messagingSenderId: "35971694420",
    appId: "1:35971694420:web:343d28783d2533b70c92c1",
    measurementId: "G-C88P1P5E3K"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  // Ensure session persists
  setPersistence(auth, browserSessionPersistence)
      .then(() => console.log("Session Persistence Enabled"))
      .catch((error) => console.error("Persistence Error:", error));
  
  export { auth, db };
  