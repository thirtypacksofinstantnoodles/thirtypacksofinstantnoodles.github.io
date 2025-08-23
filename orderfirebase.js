import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase config
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
console.log("✅ Firebase initialized");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const checkoutButton = document.getElementById('checkout-button');

  checkoutButton.addEventListener('click', async () => {
    // Update cart from localStorage just before checkout
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    const totalPrice = parseFloat(document.getElementById('total-price').textContent);

    const orderData = {
      items: [...cart],
      totalPrice: totalPrice,
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
      timestamp: new Date()
    };

    try {
      const docRef = await addDoc(collection(db, "order"), orderData);
      console.log("✅ Order submitted with ID:", docRef.id);
      alert("Thank you for your order!");

      // Clear UI and cart
      document.getElementById('cart-items').innerHTML = '';
      document.getElementById('total-price').textContent = '0.00';
      cart = [];
      localStorage.removeItem('cart');

      // Redirect to payment
      window.location.href = "payment.html";

    } catch (error) {
      console.error("❌ Error submitting order:", error);
      alert("There was an error placing your order. Please try again.");
    }
  });
});
