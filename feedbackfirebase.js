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

console.log("Firebase initialized", app);

// --- Feedback Form Submission Logic ---
const feedbackForm = document.querySelector('form'); // Or use getElementById if your form has an ID

if (feedbackForm) { // Check if the feedback form exists on the page
  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const helpWithOptions = feedbackForm.querySelectorAll('input[name="help"]');
    let helpWith = '';
    for (const radio of helpWithOptions) {
      if (radio.checked) {
        helpWith = radio.value;
        break;
      }
    }

    const reasonOptions = feedbackForm.querySelectorAll('input[name="reason"]');
    let reason = '';
    for (const radio of reasonOptions) {
      if (radio.checked) {
        reason = radio.value;
        break;
      }
    }

    const comments = feedbackForm.querySelector('#comments').value;
    const name = feedbackForm.querySelector('#name').value;
    const phoneNumber = feedbackForm.querySelector('#pnumber').value;
    const email = feedbackForm.querySelector('#email').value;

    const formData = {
      helpWith: helpWith,
      reason: reason,
      comments: comments,
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      timestamp: new Date()
    };

    addDoc(collection(db, "feedback"), formData)
      .then((docRef) => {
        console.log("Feedback document written with ID: ", docRef.id);
        feedbackForm.reset();
        alert("Thank you for your feedback!");
      })
      .catch((error) => {
        console.error("Error adding feedback document: ", error);
        alert("There was an error submitting your feedback. Please try again.");
      });
  });
}


