import { featuredProducts } from '../services/ak.office.service.js';

export const getLanding = async (req, res) => {
    try {
        const featured = await featuredProducts();
        res.status(200).render('index', { title: 'Home', featured });
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
export const getSuccess = (req, res) => {
    res.status(200).render('200', { title: 'Success' });
};

export const getNotFound = (req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
};