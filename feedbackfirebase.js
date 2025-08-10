// Import the db object from firebaseinit.js
import { db } from "./firebaseinit.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Get a reference to the checkout button
const checkoutButton = document.getElementById('checkout-button');

// Add a click event listener to the checkout button
checkoutButton.addEventListener('click', async () => {
  // Get cart items from the DOM
  const cartItemsElement = document.getElementById('cart-items');
  const cartItems = [];
  cartItemsElement.querySelectorAll('li').forEach(itemElement => {
    // Extract item details from the list item text (you might need to adjust this based on your li format)
    const text = itemElement.textContent.trim();
    // Basic parsing - you might need a more robust approach depending on your list item structure
    const match = text.match(/(.+)\sx(\d+)\s-\sRM(\d+\.\d{2})/);
    if (match) {
      const name = match[1].trim();
      const quantity = parseInt(match[2]);
      const price = parseFloat(match[3]);
      cartItems.push({ name, quantity, price });
    }
  });

  // Get total price from the DOM
  const totalPriceElement = document.getElementById('total-price');
  const totalPrice = parseFloat(totalPriceElement.textContent);

  if (cartItems.length === 0) {
    alert("Your cart is empty. Please add items before checking out.");
    return;
  }

  // Create an object with the order data
  const orderData = {
    items: cartItems,
    totalPrice: totalPrice,
    timestamp: new Date() // Add a timestamp
  };

  try {
    // Save order data to Firestore
    const docRef = await addDoc(collection(db, "order"), orderData);
    console.log("Order document written with ID: ", docRef.id);

    // Optionally, provide feedback to the user (you might clear the cart display in ordercart.js)
    alert("Thank you for your order!");

  } catch (error) {
    console.error("Error adding order document: ", error);
    alert("There was an error placing your order. Please try again.");
  }
});
