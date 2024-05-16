document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');
    const cartContainer = document.getElementById('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartCount = () => {
        cartCount.textContent = cart.length;
    };

    const addToCart = (product) => {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showSuccessMessage('Producto añadido al carrito');
    };

    const showCart = () => {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <h5>${item.title}</h5>
                    <p>${item.price}</p>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
        cartContainer.style.display = 'block';
    };

    const hideCart = () => {
        cartContainer.style.display = 'none';
    };

    const viewCart = () => {
        window.location.href = 'cart.html';
    };

    const checkout = () => {
        window.location.href = 'checkout.html';
    };

    const showSuccessMessage = (message) => {
        const successMessage = document.getElementById('success-message');
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    };

    cartIcon.addEventListener('click', showCart);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                title: button.parentElement.querySelector('.card-title').textContent,
                price: button.parentElement.querySelector('.card-text').textContent,
            };
            addToCart(product);
        });
    });

    updateCartCount();
});
