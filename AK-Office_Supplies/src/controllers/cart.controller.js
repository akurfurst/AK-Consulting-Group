import * as services from '../services/ak.office.service.js';

// Ensure a cart array exists on the session
const getCart = (req) => {
    if (!req.session.cart) req.session.cart = [];
    return req.session.cart;
};

// Shape returned in the "data" field of every cart response
const cartData = (cart) => {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { items: cart, itemCount, total };
};

// GET /api/cart
export const getCartItems = (req, res) => {
    const cart = getCart(req);
    return res.status(200).json({ success: true, data: cartData(cart) });
};

// POST /api/cart/items   body: { productId, quantity }
export const addCartItem = async (req, res) => {
    const productId = Number(req.body.productId);
    if (req.body.productId === undefined || req.body.productId === null || Number.isNaN(productId)) {
        return res.status(400).json({ success: false, error: 'productId is required' });
    }

    const quantity = req.body.quantity === undefined ? 1 : Number(req.body.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ success: false, error: 'quantity must be a positive integer' });
    }

    // Look up the product server-side to ensure it exists and to get its details (price, name, etc)
    const product = await services.findProductById(productId);
    if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const cart = getCart(req);
    const existing = cart.find(item => item.productId === product.product_id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            productId: product.product_id,
            name: product.product_name,
            price: product.price,
            image_file: product.image_file,
            quantity
        });
    }

    return res.status(201).json({ success: true, data: cartData(cart) });
};

// POST /api/cart/clear
export const clearCart = (req, res) => {
    req.session.cart = [];
    return res.status(200).json({ success: true, data: cartData(req.session.cart) });
};
