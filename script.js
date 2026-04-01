// Simple form message display
function showMsg(id, text) {
  var el = document.getElementById(id);
  if (el) {
    el.textContent = text;
  }
}

// Booking form
var bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    showMsg('bookMsg', 'Order placed successfully!');
    bookingForm.reset();
  });
}

// Login form
var loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation (in real app, this would be server-side)
    if (email && password) {
      // Store user session
      localStorage.setItem('currentUser', JSON.stringify({
        email: email,
        name: email.split('@')[0], // Extract name from email
        loginTime: new Date().toISOString()
      }));
      
      showMessage('Login successful! Redirecting...', 'success');
      
      // Redirect to menu after successful login
      setTimeout(() => {
        window.location.href = 'menu.html';
      }, 1500);
    } else {
      showMessage('Please fill in all fields', 'error');
    }
  });
}

// Check login status on page load
function checkLoginStatus() {
  const currentUser = localStorage.getItem('currentUser');
  const currentPage = window.location.pathname;
  
  // Redirect to login if not logged in and trying to access menu or confirmation
  if (!currentUser && (currentPage.includes('menu.html') || currentPage.includes('confirmation.html'))) {
    showMessage('Please login first to access this page', 'error');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
    return false;
  }
  
  return true;
}

// Logout function
function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('cartData');
  showMessage('Logged out successfully', 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// Contact form
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    showMsg('contactMsg', 'Message sent! We will reply soon.');
    contactForm.reset();
  });
}

// Cart System
let cart = [];

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCartUI();
    showMessage(`${name} added to cart!`, 'success');
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const buyNowBtn = document.getElementById('buyNowBtn');
    
    if (!cartCount) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty</p>
                    <button class="btn" onclick="hideCart()">Continue Shopping</button>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price}</div>
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    if (cartTotal) {
        cartTotal.textContent = `₹${totalPrice}`;
    }
    
    if (buyNowBtn) {
        buyNowBtn.style.display = cart.length > 0 ? 'block' : 'none';
    }
}

function showCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.add('open');
    }
}

function hideCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
    }
}

function checkout() {
    if (cart.length === 0) {
        showMessage('Your cart is empty!', 'error');
        return;
    }
    
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        showMessage('Please login first to proceed with checkout', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    // Store cart data and redirect to booking
    localStorage.setItem('cartData', JSON.stringify(cart));
    hideCart();
    window.location.href = 'booking.html';
}

function buyNow() {
    checkout();
}

// Go to confirmation page
function goToConfirmation() {
    if (cart.length === 0) {
        showMessage('Your cart is empty!', 'error');
        return;
    }
    
    // Store cart data and redirect to confirmation
    localStorage.setItem('cartData', JSON.stringify(cart));
    window.location.href = 'confirmation.html';
}

// Load confirmation page data
function loadConfirmationPage() {
    const cartData = localStorage.getItem('cartData');
    if (cartData) {
        cart = JSON.parse(cartData);
        displayOrderSummary();
    } else {
        showMessage('No cart data found', 'error');
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 1500);
    }
}

function displayOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const totalPrice = document.getElementById('totalPrice');
    
    if (!orderSummary || !totalPrice) return;
    
    if (cart.length === 0) {
        orderSummary.innerHTML = '<p style="color: #ccc;">Your cart is empty</p>';
        totalPrice.textContent = '0';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    orderSummary.innerHTML = cart.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <div>
                <strong style="color: #fff;">${item.name}</strong>
                <span style="color: #aaa; margin-left: 10px;">x${item.quantity}</span>
            </div>
            <span style="color: #ff5733; font-weight: bold;">₹${item.price * item.quantity}</span>
        </div>
    `).join('');
    
    totalPrice.textContent = total;
}

function goBack() {
    window.location.href = 'menu.html';
}

function confirmOrder() {
    const address = document.getElementById('deliveryAddress').value.trim();
    
    if (!address) {
        showMessage('Please enter your delivery address', 'error');
        return;
    }
    
    if (cart.length === 0) {
        showMessage('Your cart is empty', 'error');
        return;
    }
    
    // Store order data
    const orderData = {
        items: cart,
        address: address,
        totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        orderTime: new Date().toISOString()
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Clear cart
    cart = [];
    localStorage.removeItem('cartData');
    
    showMessage('Order confirmed! Redirecting...', 'success');
    
    // Redirect to success page
    setTimeout(() => {
        window.location.href = 'success.html';
    }, 1500);
}

// Load success page data
function loadSuccessPage() {
    const orderData = localStorage.getItem('lastOrder');
    const orderDetails = document.getElementById('orderDetails');
    
    if (orderData && orderDetails) {
        const order = JSON.parse(orderData);
        
        orderDetails.innerHTML = `
            <h4 style="color: #ff5733; margin-bottom: 15px;">Order Details:</h4>
            ${order.items.map(item => `
                <div style="display: flex; justify-content: space-between; padding: 5px 0; color: #ccc;">
                    <span>${item.name} x${item.quantity}</span>
                    <span>₹${item.price * item.quantity}</span>
                </div>
            `).join('')}
            <hr style="border-color: rgba(255,255,255,0.2); margin: 10px 0;">
            <div style="display: flex; justify-content: space-between; color: #fff; font-weight: bold;">
                <span>Total:</span>
                <span style="color: #ff5733;">₹${order.totalPrice}</span>
            </div>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.2);">
                <p style="color: #ccc; margin: 5px 0;"><strong>Delivery Address:</strong></p>
                <p style="color: #aaa;">${order.address}</p>
            </div>
        `;
    }
}

// Quick Checkout Modal
function showQuickCheckout() {
    if (cart.length === 0) return;
    
    const modal = document.createElement('div');
    modal.className = 'quick-checkout-modal';
    modal.innerHTML = `
        <div class="quick-checkout-content">
            <div class="quick-checkout-header">
                <h3>🛒 Quick Checkout</h3>
                <button class="close-modal" onclick="closeQuickCheckout()">×</button>
            </div>
            <div class="order-summary">
                <h4>Order Summary</h4>
                <div class="summary-items">
                    ${cart.map(item => `
                        <div class="summary-item">
                            <span>${item.name} x${item.quantity}</span>
                            <span>₹${item.price * item.quantity}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="summary-total">
                    <strong>Total: ₹${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</strong>
                </div>
            </div>
            <form id="quickCheckoutForm">
                <div class="form-group">
                    <label>Delivery Location</label>
                    <input type="text" id="deliveryLocation" placeholder="Enter your delivery address" required>
                </div>
                <button type="submit" class="btn pay-btn">Proceed to Pay</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listener
    document.getElementById('quickCheckoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processPayment();
    });
}

function closeQuickCheckout() {
    const modal = document.querySelector('.quick-checkout-modal');
    if (modal) {
        modal.remove();
    }
}

function processPayment() {
    const location = document.getElementById('deliveryLocation').value;
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Store order data
    const orderData = {
        items: cart,
        location: location,
        totalPrice: totalPrice,
        orderTime: new Date().toISOString()
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Clear cart
    cart = [];
    updateCartUI();
    
    // Close modal and show success
    closeQuickCheckout();
    showPaymentSuccess();
}

function showPaymentSuccess() {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-content">
            <div class="success-icon">🎉</div>
            <h2>Payment Successful!</h2>
            <p>Your order has been placed successfully</p>
            <p>Estimated delivery time: 30-45 minutes</p>
            <button class="btn" onclick="closeSuccessModal()">Continue Shopping</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.remove();
    }
}
// Rotating Background System
const backgrounds = [
    'backgrounds/image.png',
    'backgrounds/image copy.png', 
    'backgrounds/image copy 2.png',
    'backgrounds/image copy 3.png',
    'backgrounds/image copy 4.png',
    'backgrounds/image copy 5.png'
];

let currentBgIndex = 0;

function changeBackground() {
    const hero = document.querySelector('.hero');
    if (hero) {
        // Add fade animation class
        hero.classList.add('fade-animation');
        
        setTimeout(() => {
            currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
            hero.style.background = `url('${backgrounds[currentBgIndex]}') no-repeat center / cover`;
            
            // Remove animation class after transition
            setTimeout(() => {
                hero.classList.remove('fade-animation');
            }, 1500);
        }, 300);
    }
}

// Change background every 5 seconds
setInterval(changeBackground, 5000);

// Booking System
let bookingStep = 1;
let customerData = {};

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.booking-step').forEach(el => el.style.display = 'none');
    
    // Show current step
    const currentStepEl = document.querySelector(`#step${step}`);
    if (currentStepEl) {
        currentStepEl.style.display = 'block';
    }
    
    // Update progress
    updateProgress(step);
}

function updateProgress(step) {
    const progressBars = document.querySelectorAll('.progress-step');
    progressBars.forEach((bar, index) => {
        if (index < step) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });
}

function nextStep() {
    if (validateCurrentStep()) {
        bookingStep++;
        if (bookingStep <= 3) {
            showStep(bookingStep);
        }
    }
}

function prevStep() {
    if (bookingStep > 1) {
        bookingStep--;
        showStep(bookingStep);
    }
}

function validateCurrentStep() {
    if (bookingStep === 1) {
        const name = document.getElementById('customerName').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        
        if (!name || !email || !phone) {
            showMessage('Please fill in all customer details', 'error');
            return false;
        }
        
        customerData = { name, email, phone };
        return true;
    }
    return true;
}

function selectFood(foodName, price, image) {
    customerData.food = { name: foodName, price: price, image: image };
    
    // Update selected food display
    document.querySelectorAll('.food-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    event.currentTarget.classList.add('selected');
    
    // Update selected food display in step 3
    const selectedFoodDisplay = document.getElementById('selectedFoodDisplay');
    if (selectedFoodDisplay) {
        selectedFoodDisplay.innerHTML = `
            <div style="display: flex; align-items: center; gap: 20px; justify-content: center;">
                <img src="${image}" alt="${foodName}" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover;">
                <div>
                    <h4 style="color: #ff5733; margin: 0;">${foodName}</h4>
                    <p style="color: #ccc; margin: 5px 0;">₹${price} per item</p>
                </div>
            </div>
        `;
    }
    
    // Enable next button
    document.querySelector('.next-btn').disabled = false;
}

function placeOrder() {
    const quantity = document.getElementById('quantity').value || 1;
    const address = document.getElementById('deliveryAddress').value.trim();
    
    if (!address) {
        showMessage('Please enter delivery address', 'error');
        return;
    }
    
    customerData.quantity = quantity;
    customerData.address = address;
    customerData.totalPrice = customerData.food.price * quantity;
    
    // Show confirmation
    showOrderConfirmation();
}

function showOrderConfirmation() {
    const confirmationEl = document.querySelector('#orderConfirmation');
    const orderDetailsEl = document.querySelector('#orderDetails');
    
    if (confirmationEl && orderDetailsEl) {
        orderDetailsEl.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: #ff5733; margin-bottom: 20px;">🎉 Order Placed Successfully!</h3>
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <p><strong>Name:</strong> ${customerData.name}</p>
                    <p><strong>Food:</strong> ${customerData.food.name}</p>
                    <p><strong>Quantity:</strong> ${customerData.quantity}</p>
                    <p><strong>Total Price:</strong> ₹${customerData.totalPrice}</p>
                    <p><strong>Delivery Address:</strong> ${customerData.address}</p>
                </div>
                <p style="color: #6fcf97; margin-bottom: 20px;">Your order will be delivered in 30-45 minutes!</p>
                <button class="btn" onclick="resetBooking()">Place New Order</button>
            </div>
        `;
        
        showStep(4);
    }
}

function resetBooking() {
    bookingStep = 1;
    customerData = {};
    showStep(1);
    
    // Reset form
    document.getElementById('bookingForm').reset();
    document.querySelectorAll('.food-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector('.next-btn').disabled = true;
}

function showMessage(message, type = 'success') {
    const msgEl = document.getElementById('bookMsg');
    if (msgEl) {
        msgEl.textContent = message;
        msgEl.style.color = type === 'error' ? '#ff5733' : '#6fcf97';
        msgEl.style.display = 'block';
        
        setTimeout(() => {
            msgEl.style.display = 'none';
        }, 3000);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check login status first
    if (!checkLoginStatus()) {
        return; // Stop if login check fails and redirects
    }
    
    // Update cart UI on menu page
    if (window.location.pathname.includes('menu.html')) {
        updateCartUI();
        
        // Load saved cart data
        const savedCart = localStorage.getItem('cartData');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartUI();
        }
    }
    
    // Load confirmation page data
    if (window.location.pathname.includes('confirmation.html')) {
        loadConfirmationPage();
    }
    
    // Load success page data
    if (window.location.pathname.includes('success.html')) {
        loadSuccessPage();
    }
    
    // Show user info if logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        console.log('Logged in as:', userData.email);
    }
});
