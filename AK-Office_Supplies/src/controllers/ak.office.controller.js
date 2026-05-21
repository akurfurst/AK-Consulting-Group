import { featuredProducts } from '../services/products.service.js';

export const getLanding = async (req, res) => {
    try {
        const featured = await featuredProduct();
        res.render('index', { title: 'Home', featured });
    } catch (err) {
        console.error('Error loading landing page:', err);
        res.status(500).send('Server error');
    }
};

export const getLogin = (req, res) => {
    res.render('login', { title: 'Login' });
};

export const getRegister = (req, res) => {
    res.render('register', { title: 'Register' });
};

export const getProducts = (req, res) => {
    res.render('products', { title: 'Products' });
};