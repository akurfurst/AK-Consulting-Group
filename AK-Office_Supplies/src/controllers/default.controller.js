import { featuredProducts } from '../services/products.service.js';

export const getLanding = (req, res) => {
    const featured = featuredProducts();
    res.render('landing', { featured });
};

export const getLogin = (req, res) => {
    res.render('login');
};

export const getRegister = (req, res) => {
    res.render('register');
};

export const getProducts = (req, res) => {
    res.render('products');
};