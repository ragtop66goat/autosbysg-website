// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCBIKBpEbzvnTXBJ84n6oY8TiQntXRQlLc",
    authDomain: "ragtop-firebase.firebaseapp.com",
    projectId: "ragtop-firebase",
    storageBucket: "ragtop-firebase.appspot.com",
    messagingSenderId: "950186034674",
    appId: "1:950186034674:web:a8a57b1f87feb04443976b",
    measurementId: "G-30P8KLWPS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


