// wires those to get called by the router
// POST /api/cart/add, POST /api/cart/remove, GET /api/cart, POST /api/cart/clear

import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import {
    getCartItems, addCartItem, updateCart, removeCartItem, clearCart
} from '../controllers/cart.controller.js';

const router = Router();

// login
router.use(requireAuth);

router.get('/', getCartItems);
router.post('/items', addCartItem);
router.put('/items/:productId', updateCart);
router.delete('/items/:productId', removeCartItem);
router.post('/clear', clearCart);

export default router;