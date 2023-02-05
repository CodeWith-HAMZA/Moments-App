// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdvFHgYeXQl7aspvfSMc0z4Zf1So6KkIs",
    authDomain: "notesapp-c5e38.firebaseapp.com",
    projectId: "notesapp-c5e38",
    storageBucket: "notesapp-c5e38.appspot.com",
    messagingSenderId: "155811668863",
    appId: "1:155811668863:web:4d93727e7dade5c4dcb04a"
};

// Initialize Firebase
export const storage = getStorage();
export const auth = getAuth();
export const app = initializeApp(firebaseConfig);