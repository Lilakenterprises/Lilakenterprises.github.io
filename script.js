// Navigation Menu Toggle for Mobile View
function toggleNavMenu() {
    const navMenu = document.querySelector('nav');
    navMenu.classList.toggle('hidden');
}

// Event listener for Mobile Menu Toggle Button
document.querySelector('.nav-toggle').addEventListener('click', toggleNavMenu);

// Handle Adding Items to Cart
function addToCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const product = document.querySelector(`#product-${productId}`);
    const productName = product.querySelector('h3').innerText;
    const productPrice = parseFloat(product.querySelector('p').innerText.replace('Price: $', ''));
    
    const cartItem = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };
    
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push(cartItem);
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.querySelector('#cart-items');
    cartContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.querySelector('#checkout').classList.add('hidden');
        return;
    }
    
    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartContainer.appendChild(cartItemDiv);
    });

    document.querySelector('#checkout').classList.remove('hidden');
}

// Event listener for removing items from cart
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
        const productId = parseInt(e.target.dataset.id, 10);
        removeCartItem(productId);
    }
});

// Remove item from cart
function removeCartItem(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    updateCartUI();
}

// Initialize Cart UI on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
}

// Add to Cart Functionality
function addToCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const product = {
        id: productId,
        name: document.querySelector(`#product-${productId} h3`).innerText,
        price: document.querySelector(`#product-${productId} .price`).innerText,
    };
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${product.name} added to cart!`);
}

// Sticky Header
window.onscroll = function() {stickyHeader()};

const header = document.querySelector('header');
const sticky = header.offsetTop;

function stickyHeader() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});






