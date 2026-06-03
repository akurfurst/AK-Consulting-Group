import { Router } from "express";
import { getLanding, getLogin, getRegister, getProducts, getProductDetail, getSuccess, getNotFound, getApiProducts } from '../controllers/ak.office.controller.js';

const router = Router();

router.get('/', getLanding);
router.get('/login', getLogin);
router.get('/register', getRegister);
router.get('/products', getProducts);
router.get('/products/:id', getProductDetail);
router.get('/success', getSuccess);
router.get('/api/products', getApiProducts);


router.use(getNotFound); 
export default router;