// Initialize cart in localStorage if it doesn't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Initialize users in localStorage if they don't exist
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
        { email: 'test@test.com', password: 'test123', name: 'Test User' }
    ]));
}

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users'));
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'menu.html';
    } else {
        alert('Invalid credentials');
    }
}

// Register function
function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    if (users.find(u => u.email === email)) {
        alert('Email already registered');
        return;
    }
    
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
}

// Add to cart function
function addToCart(itemId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
    }
}

// Submit runner application
function submitRunnerApplication() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    const applications = JSON.parse(localStorage.getItem('runnerApplications') || '[]');
    applications.push({ name, email, phone, status: 'pending' });
    localStorage.setItem('runnerApplications', JSON.stringify(applications));
    
    alert('Application submitted successfully!');
    window.location.href = 'index.html';
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userDisplay = document.getElementById('userDisplay');
    
    if (currentUser) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (userDisplay) {
            const user = JSON.parse(currentUser);
            userDisplay.textContent = `Welcome, ${user.name}`;
        }
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userDisplay) userDisplay.textContent = '';
    }
    
    updateCartCount();
});

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}