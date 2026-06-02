import * as services from '../services/ak.office.service.js';

export const getLanding = async (req, res) => {
    try {
        const featured = await services.featuredProducts();
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

export const getProducts = async (req, res) => {
    const products = await services.allProducts();
    res.render('products', { title: 'Products', products });
};
export const getSuccess = (req, res) => {
    res.status(200).render('200', { title: 'Success' });
};

export const getNotFound = (req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
};

export const getProductDetail = async (req, res) => {
    try {
        const product = await services.productById(req.params.id);
        if (!product) {
            return res.status(404).render('404', { title: 'Product Not Found' });
        }
        return res.status(200).render('product', { title: product.product_name, product });
    } catch (err) {
        console.error('Error loading product detail:', err);
        return res.status(500).send('Server error');
    }
};