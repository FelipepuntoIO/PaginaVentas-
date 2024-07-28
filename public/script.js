document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = document.querySelectorAll('.product');
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');

    products.forEach(product => {
        product.querySelector('.add-to-cart').addEventListener('click', () => {
            const id = product.getAttribute('data-id');
            const name = product.getAttribute('data-name');
            const price = parseFloat(product.getAttribute('data-price'));

            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            renderCart();
        });
    });

    const renderCart = () => {
        cartItems.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
                            <button class="remove-item" data-id="${item.id}">Eliminar</button>`;
            cartItems.appendChild(li);

            totalPrice += item.price * item.quantity;
        });

        total.textContent = totalPrice.toFixed(2);
        localStorage.setItem('cart', JSON.stringify(cart));

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const itemIndex = cart.findIndex(item => item.id === id);
                if (itemIndex !== -1) {
                    cart.splice(itemIndex, 1);
                }
                renderCart();
            });
        });
    };

    renderCart(); // Render the cart on page load
});
