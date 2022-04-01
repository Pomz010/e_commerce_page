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
const thumbnailSet = document.querySelector('#thumbnail-set');
const thumbnails = document.querySelectorAll('.__thumbnails');
const imagePreview = document.querySelector('#preview-image');
let imageCounter = 0;

// Modal image slider
const modalGallery = document.querySelector('#modal-gallery');
const modalPreviewImage = imagePreview.getAttribute('src');
const modalPreview = document.querySelector('#modal-preview-image');
const modalThumbnails = document.querySelectorAll('.modal__thumbnails');
const modalImageOne = document.querySelector('#modal-image-1');
const modalImageTwo = document.querySelector('#modal-image-2');
const modalImageThree = document.querySelector('#modal-image-3');
const modalImageFour = document.querySelector('#modal-image-4');
const modalCloseBtn = document.querySelector('#modal-close');
const modalLeft = document.querySelector('#modal-left-arrow');
const modalRight = document.querySelector('#modal-right-arrow');

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
        case imageOne:
            previewImage(imageOne);
            selectModalThumbnail(modalImageOne);
            break;

        case imageTwo:
            previewImage(imageTwo);
            selectModalThumbnail(modalImageTwo);
            break;

        case imageThree:
            previewImage(imageThree);
            selectModalThumbnail(modalImageThree);
            break;

        case imageFour:
            previewImage(imageFour);
            selectModalThumbnail(modalImageFour);
            break;

        case imagePreview:
            imageModal();
            break;

        case modalGallery:
            removeActiveModal();
            break;

        case modalCloseBtn:
            removeActiveModal();
            break;
    
        case arrowLeft:
            moveLeft()
            break;

        case arrowRight:
            moveRight();
            break;

        // Thumbnail images for modal
        case modalImageOne:
            selectModalThumbnail(modalImageOne);
            break;

        case modalImageTwo:
            selectModalThumbnail(modalImageTwo);
            break;

        case modalImageThree:
            selectModalThumbnail(modalImageThree);
            break;

        case modalImageFour:
            selectModalThumbnail(modalImageFour);
            break;

        case modalLeft:
            modalMoveLeft()
            break;

        case modalRight:
            modalMoveRight();
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
        if(thumbnails[i] === target) {
            thumbnails[i].classList.add('active-preview');
            imagePreview.setAttribute('src', `./public/img/image-product-${i + 1}.webp`);
            modalPreview.setAttribute('src', `./public/img/image-product-${i + 1}.webp`);
        } else {
            thumbnails[i].classList.remove('active-preview');
        }
    }
}

// Activate Image modal when large preview image is clicked
function imageModal(){
    modalGallery.classList.add('show-modal');
}

// (modal) Large image preview changes when user selects image on thumbnails
function selectModalThumbnail(mi) {
    for(let i = 0; i !== 4; i++) {
        if(modalThumbnails[i] === mi) {
            modalThumbnails[i].classList.add('active-modal');
            modalPreview.setAttribute('src', `./public/img/image-product-${i + 1}.webp`);
        } else {
            modalThumbnails[i].classList.remove('active-modal');
        }
    }
}

// Removes active thumbnail selection on modal when user clicks on transparent background
function removeActiveModal() {
    modalGallery.classList.remove('show-modal');
    for(let i = 0; i !== 4; i++) {
        modalThumbnails[i].classList.remove('active-modal');
    }
}

function activateModal() {
    modalBackground.classList.add('show');
}

function moveLeft() {
    for(let i = 0; i !== 4; i++) {
        // Finds thumbnail that contains a class of active preview
        if(thumbnails[i].classList.contains('active-preview')) {
            // When it reaches thumbnail with index lower than the lowest index available,
            // -> it activates the last thumbnail with the highest index instead.
            if(i === 0) {
                i = 4;
            }

            // It activates the thumbnail before the thumbnail that 
            // ->currently contains a class of active-preview,
            thumbnails[i -= 1].click();
        }
    }
}

function moveRight() {
    for(let i = 0; i !== 4; i++) {
        // Finds thumbnail that contains a class of active preview
        if(thumbnails[i].classList.contains('active-preview')) {
            // When it reaches thumbnail with index of higher than highest thumbnail index available,
            // -> it activates the last thumbnail with the lowest index instead 
            if(i === 3) {
                i = -1;
            }

            // It activates the thumbnail after the thumbnail that 
            // ->currently contains a class of active-preview,
            thumbnails[i += 1].click();
        }
    }
}

function modalMoveLeft() {
    for(let i = 0; i !== 4; i++) {
        // Finds thumbnail that contains a class of active preview
        if(modalThumbnails[i].classList.contains('active-modal')) {
            // When it reaches thumbnail with index lower than the lowest index available,
            // -> it activates the last thumbnail with the highest index instead.
            if(i === 0) {
                i = 4;
            }

            // It activates the thumbnail before the thumbnail that 
            // ->currently contains a class of active-preview,
            modalThumbnails[i -= 1].click();
        }
    }
}

function modalMoveRight() {
    for(let i = 0; i !== 4; i++) {
        // Finds thumbnail that contains a class of active preview
        if(modalThumbnails[i].classList.contains('active-modal')) {
            // When it reaches thumbnail with index of higher than highest thumbnail index available,
            // -> it activates the last thumbnail with the lowest index instead 
            if(i === 3) {
                i = -1;
            }

            // It activates the thumbnail after the thumbnail that 
            // ->currently contains a class of active-preview,
            modalThumbnails[i += 1].click();
        }
    }
}