import { Router } from "express";
import { getLanding, getProducts, getProductDetail, getSuccess, getNotFound, getApiProducts } from '../controllers/ak.office.controller.js';
import * as authCtrl from '../controllers/auth.controller.js';

const router = Router();

router.get('/', getLanding);
router.get('/login', authCtrl.getLogin);
router.post('/login', authCtrl.login);
router.get('/register', authCtrl.getRegister);
router.post('/register', authCtrl.register);
router.post('/logout', authCtrl.logout);
router.get('/products', authCtrl.requireAuth, getProducts);
router.get('/products/:id', authCtrl.requireAuth, getProductDetail);
router.get('/success', getSuccess);
router.get('/api/products', authCtrl.requireAuth, getApiProducts);


router.use(getNotFound); 
export default router;