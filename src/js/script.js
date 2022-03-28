// UI Elements
// Header nav
const hamburger = document.querySelector('#burger-menu');
const cart = document.querySelector('#cart');
const avatar = document.querySelector('#avatar');

// hamburger-nav
const modalBackground = document.querySelector('#modal-background');
const burgerMenu = document.querySelector('#hidden-nav-menu');
const closeBtn = document.querySelector('#close-btn');

// Cart notification container
const cartContainer = document.querySelector('#cart-container');
const cartNotification = document.querySelector('#cart-notification');

// Cart checkout
const cartHeader = document.querySelector('#cart-header');
const cartList = document.querySelector('#cart-list');
const cartEmpty = document.querySelector('#cart-status');
const checkoutDetails =document.querySelector('#checkout-details');
const checkoutContainer = document.querySelector('#checkout-container');
const checkoutPriceContainer = document.querySelector('#checkout-price');
const checkoutQtyContainer = document.querySelector('#checkout-qty');
const checkoutBtn = document.querySelector('#checkout--btn');

// Image slider
const imagePreview = document.querySelector('#product-preview');
const arrowLeft = document.querySelector('#left-arrow');
const arrowRight = document.querySelector('#right-arrow');

// Add-to-cart section
const minusQty = document.querySelector('#minus');
const addQty = document.querySelector('#plus');
const addToCart = document.querySelector('#add-to-cart');
const currentQty = document.querySelector('#current-qty');
let checkoutQty = 0;
let checkoutPrice = 125;

let qty = 0;

// Add click event listener
document.addEventListener('click', checkElement);
function checkElement(e) {
    console.log(e.target);
    switch(e.target) {
        case hamburger:
          console.log(e.target);
          showNav();
          break;

        case closeBtn:
            console.log(e.target);
            hideNav();
            break;

        case cart:
            // console.log(e.target);
            showCart();
            break;

        case avatar:
            console.log(e.target);
            showCart();
            break;

        case minusQty: 
            // console.log(e.target);
            subtractQty();
            break;

        case addQty:
            increaseQty();
            break;

        case addToCart:
            // console.log(e.target);
            sendToCart();
            break;

        case checkoutBtn:
            clearCart();
            break;
    }

    // Close modal when user click outside cart container
    if(e.target === cart || e.target === cartList || e.target === cartHeader) {
        // Do nothing
    } else if (cartContainer.classList.contains('show-cart') && (e.target !== cart || e.target !== cartList || e.target !== cartHeader)){
        // Hide cart container
        cartContainer.classList.remove('show-cart');
    }
}

// Display hamburger nav menu
function showNav(){
    modalBackground.classList.add('show-nav');
    burgerMenu.classList.add('show-nav');
}

// Hide hamburger nav menu
function hideNav() {
    modalBackground.classList.remove('show-nav');
    burgerMenu.classList.remove('show-nav');
}

// Display Cart
function showCart() {
    cartContainer.classList.add('show-cart');
    if(checkoutQty < 1) {
        checkoutContainer.classList.add('hide-cart');
        cartEmpty.classList.remove('hide-cart');
    } else {
        cartEmpty.classList.add('hide-cart');
        checkoutContainer.classList.remove('hide-cart');
    }
}

// Subtract Qty
function subtractQty() {
    if(qty > 0) {
        qty -= 1;
        console.log(qty);
        currentQty.textContent = qty;
    } else if(qty === 0) {
        currentQty.textContent = 0;
    }
}

// Increase Qty
function increaseQty() {
    qty = ++qty;
    currentQty.textContent = qty;
    console.log(qty);
}

// Send to cart
function sendToCart() {
    if(qty > 0) {
        // Display cart container
        cartNotification.classList.add('cart-qty');

        // Adds quantity value declared to checkout quantity
        console.log(`checkoutQty: ${checkoutQty += qty}`);

        // Compute total price based on checkout quantity
        console.log(`checkoutPrice: ${checkoutPrice * qty}`);

        // Display total quantity for checkout
        checkoutQtyContainer.textContent = checkoutQty;

        // Display total checkout price 
        checkoutPriceContainer.textContent = `$${checkoutPrice.toFixed(2) * checkoutQty}`;
        
        // Update cart notification number
        cartNotification.textContent = checkoutQty;

        // Reset qty to 0
        qty = 0;
        console.log(`qty: ${qty}`);

        // Quantity displayed on Add-to-cart section
        currentQty.textContent = qty;
    }
}

// Reset Cart after checkout
function clearCart() {
    qty = 0;
    checkoutQty = 0;
    cartNotification.classList.remove('cart-qty');
    cartContainer.classList.remove('show-cart');
}