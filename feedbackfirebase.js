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

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized", app);

// Select your form by its ID or element name
const feedbackForm = document.querySelector('form');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get values from radio inputs named 'help'
    const helpWithOptions = feedbackForm.querySelectorAll('input[name="help"]');
    let helpWith = '';
    helpWithOptions.forEach(radio => {
      if (radio.checked) helpWith = radio.value;
    });

    // Get values from radio inputs named 'reason'
    const reasonOptions = feedbackForm.querySelectorAll('input[name="reason"]');
    let reason = '';
    reasonOptions.forEach(radio => {
      if (radio.checked) reason = radio.value;
    });

    // Get values from other inputs by ID
    const comments = feedbackForm.querySelector('#comments')?.value || '';
    const name = feedbackForm.querySelector('#name')?.value || '';
    const phoneNumber = feedbackForm.querySelector('#pnumber')?.value || '';
    const email = feedbackForm.querySelector('#email')?.value || '';

    // Prepare data object
    const formData = {
      helpWith,
      reason,
      comments,
      name,
      phoneNumber,
      email,
      timestamp: new Date()
    };

    try {
      // Add data to Firestore 'feedback' collection
      const docRef = await addDoc(collection(db, "feedback"), formData);
      console.log("Feedback document written with ID: ", docRef.id);

      // Reset the form and notify user
      feedbackForm.reset();
      alert("Thank you for your feedback!");
    } catch (error) {
      console.error("Error adding feedback document: ", error);
      alert("There was an error submitting your feedback. Please try again.");
    }
  });
} else {
  console.warn("Feedback form not found on the page.");
}
