// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const overlay = document.querySelector('.overlay');
const closeCart = document.querySelector('.close-cart');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalPriceElement = document.querySelector('.total-price');

// Cart State
let cart = [];

// Toggle Cart
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Add to Cart
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.product');
        const productId = productElement.getAttribute('data-id');
        const productTitle = productElement.querySelector('h3').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));
        const productImg = productElement.querySelector('img').src;

        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                title: productTitle,
                price: productPrice,
                img: productImg,
                quantity: 1
            });
        }

        updateCart();
    });
});

// Update Cart UI
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                <div class="remove-item" data-id="${item.id}">Remove</div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);

        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
    });

    // Update total price and cart count
    totalPriceElement.textContent = totalPrice.toFixed(2);
    cartCount.textContent = totalItems;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.getAttribute('data-id');
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
        });
    });
}
