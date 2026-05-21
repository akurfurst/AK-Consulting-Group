import { featuredProduct } from '../services/default.service.js';

// export const getLanding = (req, res) => { maybe we can add a featured product to the landing page in the future
//     const featured = featuredProduct();
//     res.render('landing', { featured });
// }; 

export const getLogin = (req, res) => {
    res.render('login');
};

export const getRegister = (req, res) => {
    res.render('register');
};

export const getProducts = (req, res) => {
    res.render('products');
};