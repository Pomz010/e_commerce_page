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
const productPreview = document.querySelector('#product-preview');
const arrowLeft = document.querySelector('#left-arrow');
const arrowRight = document.querySelector('#right-arrow');
const imageOne = document.querySelector('#image-1');
const imageTwo = document.querySelector('#image-2');
const imageThree = document.querySelector('#image-3');
const imageFour = document.querySelector('#image-4');
const thumbnails = document.querySelectorAll('.__thumbnails');
const imagePreview = document.querySelector('#preview-image');

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
    // console.log(e.target);
    switch(e.target) {
        case hamburger:
          console.log(e.target);
          showNav();
          break;

        case closeBtn:
            console.log(e.target);
            hideNav();
            break;

        case modalBackground:
            hideNav();
            break

        case cart:
            // console.log(e.target);
            showCart();
            break;

        case avatar:
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

        // Targetting image gallery thumbnails
        case e.target:
            previewImage(e.target);
            break;

        case imagePreview:
            imageModal();
            break;
    }

    // Close modal when user click outside cart container
    if(e.target === cart || e.target === avatar || e.target === cartList || e.target === cartHeader) {
        // Do nothing
    } else if (cartContainer.classList.contains('show') && (e.target !== cart || e.target !== avatar || e.target !== cartList || e.target !== cartHeader)){
        // Hide cart container
        cartContainer.classList.remove('show');
    }
}

// Display hamburger nav menu
function showNav(){
    activateModal();
    burgerMenu.classList.add('show-nav');
}

// Hide hamburger nav menu
function hideNav() {
    modalBackground.classList.remove('show');
    burgerMenu.classList.remove('show-nav');
}

// Display Cart
function showCart() {
    console.log('poms');
    cartContainer.classList.toggle('show');
    if(checkoutQty < 1) {
        checkoutContainer.classList.add('hide');
        cartEmpty.classList.remove('hide');
    } else {
        cartEmpty.classList.add('hide');
        checkoutContainer.classList.remove('hide');
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
        checkoutPriceContainer.textContent = `$${(checkoutPrice * checkoutQty).toFixed(2)}`;
        
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

// Toggles active class for image thumbnails
function previewImage(target) {
    for(let i = 0; i !== 4; i++) {
        if(target === thumbnails[i]) {
            thumbnails[i].classList.add('active-preview')
            imagePreview.setAttribute('src', `./public/img/image-product-${i + 1}.webp`);
        } else {
            thumbnails[i].classList.remove('active-preview');
        }
    }
}

// Activate Image modal when large preview image is clicked
function imageModal(){
    activateModal();
}

function activateModal() {
    modalBackground.classList.add('show');
}