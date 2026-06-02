import { Router } from "express";
import { getLanding, getLogin, getRegister, getProducts, getProductDetail, getSuccess, getNotFound } from '../controllers/ak.office.controller.js';

const router = Router();

router.get('/', getLanding);
router.get('/login', getLogin);
router.get('/register', getRegister);
router.get('/products', getProducts);
router.get('/products/:id', getProductDetail);
router.get('/success', getSuccess);
router.use(getNotFound); 

export default router;