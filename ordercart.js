// cart.js
let cart = [];

function addToCart(form) {
  const itemName = form.getAttribute('data-name');
  const basePrice = parseFloat(form.getAttribute('data-price'));
  const quantity = parseInt(form.querySelector('input[type="number"]').value);

  if (quantity <= 0) {
    alert('Please select a quantity greater than 0.');
    return;
  }

  let addons = [];
  let addonsPrice = 0;
  form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    if (checkbox.checked) {
      addons.push(checkbox.value);
      addonsPrice += parseFloat(checkbox.getAttribute('data-price'));
    }
  });

  // Check if item with same addons already exists
  let found = cart.find(item =>
    item.name === itemName &&
    JSON.stringify(item.addons.sort()) === JSON.stringify(addons.sort())
  );

  if (found) {
    found.quantity += quantity;
    found.totalPrice += quantity * (basePrice + addonsPrice);
  } else {
    cart.push({
      name: itemName,
      quantity: quantity,
      addons: addons,
      totalPrice: quantity * (basePrice + addonsPrice)
    });
  }

  updateCartDisplay();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsEl = document.getElementById('cart-items');
  cartItemsEl.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.totalPrice;
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity}`;
    if (item.addons.length > 0) {
      li.textContent += ` (+${item.addons.join(', ')})`;
    }
    li.textContent += ` - RM${item.totalPrice.toFixed(2)}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeFromCart(index);

    li.appendChild(removeBtn);
    cartItemsEl.appendChild(li);
  });

  document.getElementById('total-price').textContent = total.toFixed(2);
}
