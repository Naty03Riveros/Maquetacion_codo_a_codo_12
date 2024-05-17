document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartIcon = document.getElementById('cartIcon');
    const searchBar = document.getElementById('searchBar');
    const products = document.querySelectorAll('.product');
    const cartModal = document.getElementById('cartModal');
    const closeModal = document.querySelector('.close');
    const cartItemsList = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkout');
    let currentIndex = 0;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.product');
            const productName = productElement.getAttribute('data-name');
            const quantity = parseInt(productElement.querySelector('.quantity').textContent);
            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push({ name: productName, quantity: quantity });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartIcon();
        });
    });

    function updateCartIcon() {
        cartIcon.textContent = `🛒 Ver Carrito (${cart.length})`;
    }

    cartIcon.addEventListener('click', () => {
        displayCart();
        cartModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    function displayCart() {
        cartItemsList.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Cantidad: ${item.quantity}`;
            cartItemsList.appendChild(li);
        });
    }

    checkoutBtn.addEventListener('click', () => {
        alert('Compra finalizada. ¡Gracias por su compra!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
        cartModal.style.display = 'none';
    });

    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');

    increaseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const quantitySpan = button.previousElementSibling;
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
        });
    });

    decreaseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const quantitySpan = button.nextElementSibling;
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
            }
        });
    });

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        products.forEach(product => {
            const productName = product.getAttribute('data-name').toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // Update cart icon on page load
    updateCartIcon();
});
