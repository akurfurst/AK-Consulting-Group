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

export const getProductDetail = async (req, res) => {
    try {
        const product = await services.findProductById(req.params.id);
        if (!product) {
            return res.status(404).render('404', { title: 'Product Not Found' });
        }
        return res.status(200).render('product', { title: product.product_name, product });
    } catch (err) {
        console.error('Error loading product detail:', err);
        return res.status(500).send('Server error');
    }
};

export const getSuccess = (req, res) => {
    res.status(200).render('200', { title: 'Success' });
};

export const getNotFound = (req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
};

// filter use getApiProducts
export const getApiProducts = async (req, res) => {
    try {
        const { search, maxPrice, category } = req.query;
        const products = await services.filteredProducts({ search, maxPrice, category });
        
        if (products.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (err) {
        console.error('Error fetching products here:', err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};
