let cartCount = 0;

function showMessage(message, type) {
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    if (type === 'success') {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    } else {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }
    setTimeout(() => {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }, 3000);
}

function addToCart(productId) {
    cartCount++;
    updateCartCount();
    showMessage('Producto añadido al carrito.', 'success');
}

function showCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
}
