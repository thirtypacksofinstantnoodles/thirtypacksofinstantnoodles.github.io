import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  // Your Firebase configuration details (make sure these are correct)
  apiKey: "AIzaSyBtJnZ7ZK8JW1FH6gd1SPKJoJXJMSgzpM4", // Use your actual API key
  authDomain: "instant-noodles-a8c7d.firebaseapp.com",
  projectId: "instant-noodles-a8c7d",
  storageBucket: "instant-noodles-a8c7d.firebasestorage.app",
  messagingSenderId: "785588231065",
  appId: "1:785588231065:web:17f9866a7e7960613a1108",
  measurementId: "G-T6L1X7NGGD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized in orderfirebase.js", app);


// Get a reference to the checkout button
const checkoutButton = document.getElementById('checkout-button'); // Make sure your checkout button has this ID

// Add a click event listener to the checkout button
checkoutButton.addEventListener('click', async () => {
  // Collect order data from the DOM
  // This part needs to accurately reflect how you store order data in your HTML
  // Based on your order.html, it seems the cart items are in a ul with id="cart-items"
  // and the total price is in a span with id="total-price"

  const cartItemsElement = document.getElementById('cart-items');
  const cartItems = [];
  cartItemsElement.querySelectorAll('li').forEach(itemElement => {
    // Extract item details from the list item text
    // This parsing logic might need to be adjusted based on your li format
    const text = itemElement.textContent.trim();
    const match = text.match(/(.+)\sx(\d+)\s-\sRM(\d+\.\d{2})/); // Adjust regex if needed
    if (match) {
      const name = match[1].trim();
      const quantity = parseInt(match[2]);
      const price = parseFloat(match[3]);
      cartItems.push({ name, quantity, price });
    }
  });

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
    items: cartItems, // Restore the original structure

    totalPrice: totalPrice, // Keep the total price as is
    timestamp: new Date() // Add a timestamp
  };

  // For clarity, you could also add a separate field for the total number of items
  orderData.totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  try {
    // Save order data to Firestore
    const docRef = await addDoc(collection(db, "order"), orderData); // Save to the "order" collection
    console.log("Order document written with ID: ", docRef.id);

    // Provide feedback to the user
    alert("Thank you for your order!");

    // You might want to clear the cart display here or call a function in ordercart.js to do so

  } catch (error) {
    console.error("Error adding order document: ", error);
    alert("There was an error placing your order. Please try again.");
  }
});
