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

// Get a reference to the form
const feedbackForm = document.querySelector('form'); // Or use getElementById if your form has an ID

// Add a submit event listener to the form
feedbackForm.addEventListener('submit', (event) => {
  // Prevent the default form submission
  event.preventDefault();

  // Collect form data
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

  // Create an object with the form data
  const formData = {
    helpWith: helpWith,
    reason: reason,
    comments: comments,
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    timestamp: new Date() // Add a timestamp
  };

  // Save data to Firestore
  addDoc(collection(db, "feedback"), formData)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      // Optionally, clear the form after submission
      feedbackForm.reset();
      alert("Thank you for your feedback!");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert("There was an error submitting your feedback. Please try again.");
    });
});
