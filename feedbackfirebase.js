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

// --- Order Form Submission Logic ---
const checkoutButton = document.getElementById('checkout-button');

if (checkoutButton) { // Check if the checkout button exists on the page
  checkoutButton.addEventListener('click', async () => {
    // Get cart items from the DOM (assuming these elements exist in order.html)
    const cartItemsElement = document.getElementById('cart-items');
    const cartItems = [];
    if (cartItemsElement) {
      cartItemsElement.querySelectorAll('li').forEach(itemElement => {
        const text = itemElement.textContent.trim();
        const match = text.match(/(.+)\sx(\d+)\s-\sRM(\d+\.\d{2})/); // Adjust parsing if needed
        if (match) {
          const name = match[1].trim();
          const quantity = parseInt(match[2]);
          const price = parseFloat(match[3]);
          cartItems.push({ name, quantity, price });
        }
      });
    }


    // Get total price from the DOM (assuming this element exists in order.html)
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = totalPriceElement ? parseFloat(totalPriceElement.textContent) : 0;


    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    const orderData = {
      items: cartItems,
      totalPrice: totalPrice,
      timestamp: new Date()
    };

    try {
      const docRef = await addDoc(collection(db, "order"), orderData);
      console.log("Order document written with ID: ", docRef.id);

      // You'll likely need to call a function from ordercart.js here to clear the cart display
      // e.g., if ordercart.js exposes a clearCart() function:
      // if (typeof clearCart === 'function') {
      //   clearCart();
      // }


      alert("Thank you for your order!");

    } catch (error) {
      console.error("Error adding order document: ", error);
      alert("There was an error placing your order. Please try again.");
    }
  });
}
