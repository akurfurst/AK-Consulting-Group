//end point handlers for cart
// getCartItems, addCartItem, removeCarItem, clearCart

import * as services from '../services/ak.office.service.js';

// Ensure a cart array exists on the session
const getCart = (req) => {
    if (!req.session.cart) req.session.cart = [];
    return req.session.cart;
};

// Cart response includes item count and total price for convenience
const cartResponse = (cart) => {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { success: true, cart, itemCount, total };
};

// GET /api/cart
export const getCartItems = (req, res) => {
    const cart = getCart(req);
    return res.status(200).json(cartResponse(cart));
};

// POST /api/cart/items   body: { productId }
export const addCartItem = (req, res) => {
    const { productId } = req.body;
    if (productId === undefined || productId === null) {
        return res.status(400).json({ success: false, error: 'productId is required' });
    }

    // Look up the product server-side to ensure it exists and to get its details (price, name, etc)
    const product = services.findProductById(productId);
    if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const cart = getCart(req);
    const existing = cart.find(item => item.productId === product.product_id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            productId: product.product_id,
            name: product.product_name,
            price: product.price,
            image: product.image_file,
            quantity: 1
        });
    }

    return res.status(201).json(cartResponse(cart));
};

// PUT /api/cart/items/:productId   body: { quantity }
export const updateCart = (req, res) => {
    const productId = Number(req.params.productId);
    const { quantity } = req.body;
    const qty = Number(quantity);

    if (quantity === undefined || Number.isNaN(qty) || qty < 0) {
        return res.status(400).json({ success: false, error: 'A valid quantity (0 or greater) is required' });
    }

    const cart = getCart(req);
    const index = cart.findIndex(item => item.productId === productId);
    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Item not in cart' });
    }

    if (qty === 0) {
        cart.splice(index, 1);          // quantity 0 removes the line item
    } else {
        cart[index].quantity = qty;
    }

    return res.status(200).json(cartResponse(cart));
};

// DELETE /api/cart/items/:productId
export const removeCartItem = (req, res) => {
    const productId = Number(req.params.productId);
    const cart = getCart(req);
    const index = cart.findIndex(item => item.productId === productId);

    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Item not in cart' });
    }

    cart.splice(index, 1);
    return res.status(200).json(cartResponse(cart));
};

// POST /api/cart/clear
export const clearCart = (req, res) => {
    req.session.cart = [];
    return res.status(200).json(cartResponse(req.session.cart));
};