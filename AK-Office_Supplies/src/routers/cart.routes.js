// wires cart endpoint handlers to the router
// GET /api/cart, POST /api/cart/items, POST /api/cart/clear

import { Router } from 'express';
import {
    getCartItems, addCartItem, clearCart
} from '../controllers/cart.controller.js';

const router = Router();

// auth required
router.get('/', getCartItems);
router.post('/items', addCartItem);
router.post('/clear', clearCart);

export default router;
