document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Compra realizada con éxito!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
});
