let cartItems = []; // Each item: { name, price, quantity }
let total = 0;

// Add item to cart
function addToCart(name, price) {
    const existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name, price, quantity: 1 });
    }

    total += price;
    updateCart();
}

// Remove one quantity of an item
function removeFromCart(name) {
    const index = cartItems.findIndex(item => item.name === name);

    if (index !== -1) {
        total -= cartItems[index].price;

        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
        } else {
            cartItems.splice(index, 1); // Remove entire item
        }

        updateCart();
    }
}

// Update the cart UI
function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');

    cartList.innerHTML = ''; // Clear cart

    cartItems.forEach(item => {
        const li = document.createElement('li');
        const itemTotal = item.price * item.quantity;

        li.textContent = `${item.name} - $${item.price} × ${item.quantity} = $${itemTotal.toFixed(2)} `;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = function () {
            removeFromCart(item.name);
        };

        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });

    totalDisplay.textContent = total.toFixed(2);
}

// Set up button listeners
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn1').addEventListener('click', function () {
        addToCart('Product 1', 10);
    });
    document.getElementById('btn2').addEventListener('click', function () {
        addToCart('Product 2', 15);
    });
    document.getElementById('btn3').addEventListener('click', function () {
        addToCart('Product 3', 20);
    });
});
