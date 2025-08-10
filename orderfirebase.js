import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const firebaseConfig = {
 apiKey: "AIzaSyBtJnZ7ZK8JW1FH6gd1SPKJoJXJMSgzpM4",
 authDomain: "instant-noodles-a8c7d.firebaseapp.com",
 projectId: "instant-noodles-a8c7d",
 storageBucket: "instant-noodles-a8c7d.firebasestorage.app",
 messagingSenderId: "785588231065",
 appId: "1:785588231065:web:17f9866a7e7960613a1108",
 measurementId: "G-T6L1X7NGGD"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
