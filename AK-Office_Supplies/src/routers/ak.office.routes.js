import { Router } from "express";
import { getLanding, getLogin, getRegister, getProducts, getSuccess, getNotFound } from '../controllers/ak.office.controller.js';

const router = Router();

router.get('/', getLanding);
router.get('/login', getLogin);
router.get('/register', getRegister);
router.get('/products', getProducts);
router.get('/success', getSuccess);
router.use(getNotFound); // must be last

export default router;