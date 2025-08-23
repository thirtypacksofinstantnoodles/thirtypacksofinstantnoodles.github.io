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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("✅ Firebase initialized");

document.addEventListener('DOMContentLoaded', () => {
  const checkoutButton = document.getElementById('checkout-button');

  checkoutButton.addEventListener('click', async () => {
    const cartItemsElement = document.getElementById('cart-items');
    const cartItems = [];

    cartItemsElement.querySelectorAll('li').forEach(itemElement => {
      const text = itemElement.textContent.trim();
      const match = text.match(/(.+?)\sx(\d+)(?:\s\(\+(.+)\))?\s-\sRM(\d+\.\d{2})/);

      if (match) {
        const name = match[1].trim();
        const quantity = parseInt(match[2]);
        const addonsText = match[3];
        const addons = addonsText ? addonsText.split(',').map(a => a.trim()) : [];
        const price = parseFloat(match[4]);

        cartItems.push({ name, quantity, addons, price });
      }
    });

    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = parseFloat(totalPriceElement.textContent);

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    const orderData = {
      items: cartItems,
      totalPrice: totalPrice,
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      timestamp: new Date()
    };

    try {
      const docRef = await addDoc(collection(db, "order"), orderData);
      console.log("✅ Order submitted with ID:", docRef.id);
      alert("Thank you for your order!");

      // Optional: clear cart
      document.getElementById('cart-items').innerHTML = '';
      document.getElementById('total-price').textContent = '0.00';

      // ✅ Redirect to payment page
      window.location.href = "payment.html";

    } catch (error) {
      console.error("❌ Error submitting order:", error);
      alert("There was an error placing your order. Please try again.");
    }
  });
});
