// Import the db object from firebaseinit.js
import { db } from "./firebaseinit.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ... (your existing cart logic: cart array, addToCart, removeFromCart, updateCartDisplay) ...

// Get a reference to the checkout button
const checkoutButton = document.getElementById('checkout-button');

// Add a click event listener to the checkout button
checkoutButton.addEventListener('click', async () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before checking out.");
    return;
  }

  // Create an object with the order data
  const orderData = {
    items: cart,
    totalPrice: parseFloat(document.getElementById('total-price').textContent),
    timestamp: new Date() // Add a timestamp
  };

  try {
    // Save order data to Firestore
    const docRef = await addDoc(collection(db, "order"), orderData);
    console.log("Order document written with ID: ", docRef.id);

    // Clear the cart after successful submission
    cart = [];
    updateCartDisplay();

    alert("Thank you for your order!");

  } catch (error) {
    console.error("Error adding order document: ", error);
    alert("There was an error placing your order. Please try again.");
  }
});
