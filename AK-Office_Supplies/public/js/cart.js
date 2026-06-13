// Shared cart module: talks to /api/cart endpoints and keeps the navbar
// cart icon + dropdown panel in sync without a page refresh.

const money = (n) => Number(n).toFixed(2);

// Render the cart count badge + dropdown panel from a { items, itemCount, total } payload
const renderCart = (data) => {
    const countEl = document.getElementById('cartCount');
    if (countEl) {
        countEl.textContent = data.itemCount;
        countEl.hidden = data.itemCount === 0;
    }

    const itemsEl = document.getElementById('cartItems');
    if (itemsEl) {
        if (data.items.length === 0) {
            itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        } else {
            itemsEl.innerHTML = data.items.map(item => `
                <div class="cart-item" data-id="${item.productId}">
                    <img src="/images/products/${item.image_file}" alt="${item.name}" onerror="this.src='/images/default.webp'" />
                    <div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-meta">$${money(item.price)} &times; ${item.quantity}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    const totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = money(data.total);
};

// Fetch the current cart from the session and render it
const fetchCart = async () => {
    const res = await fetch('/api/cart');
    const json = await res.json();
    if (json.success) renderCart(json.data);
    return json;
};

// POST /api/cart/items  { productId, quantity }
const addItemToCart = async (productId, quantity = 1) => {
    const res = await fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
    });
    const json = await res.json();
    if (json.success) renderCart(json.data);
    return json;
};

// POST /api/cart/clear
const clearCart = async () => {
    const res = await fetch('/api/cart/clear', { method: 'POST' });
    const json = await res.json();
    if (json.success) renderCart(json.data);
    return json;
};

// Expose for other scripts (e.g. the product modal in default.js)
window.AKCart = { addItemToCart, clearCart, fetchCart };

document.addEventListener('DOMContentLoaded', () => {
    // 1. On page load, populate the navbar cart icon + panel from the session cart
    fetchCart();

    // Toggle the cart dropdown panel
    const toggle = document.getElementById('cartToggle');
    const panel = document.getElementById('cartPanel');
    if (toggle && panel) {
        toggle.addEventListener('click', () => {
            const willShow = panel.hidden;
            panel.hidden = !willShow;
            toggle.setAttribute('aria-expanded', String(willShow));
        });

        document.addEventListener('click', (e) => {
            if (!panel.hidden && !panel.contains(e.target) && !toggle.contains(e.target)) {
                panel.hidden = true;
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Clear the whole cart
    const clearBtn = document.getElementById('clearCartBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearCart);
    }

    // Generic "Add to Cart" buttons (product detail page, etc.)
    // Looks for a quantity input with [data-cart-qty] if present.
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const productId = Number(btn.dataset.id);
            const qtyInput = document.querySelector('[data-cart-qty]');
            const quantity = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;

            btn.disabled = true;
            const result = await addItemToCart(productId, quantity);

            const feedback = btn.parentElement.querySelector('.add-to-cart-feedback');
            if (feedback) {
                feedback.textContent = result.success ? 'Added to cart!' : (result.error || 'Could not add to cart');
            }
            btn.disabled = false;
        });
    });
});
