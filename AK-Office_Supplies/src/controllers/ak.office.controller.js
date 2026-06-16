import * as services from '../services/ak.office.service.js';

export const getLanding = async (req, res) => {
    try {
        const featured = await services.featuredProducts();
        res.status(200).render('index', { title: 'Home', featured, user: req.session.user });
    } catch (err) {
        console.error('Error loading landing page:', err);
        res.status(500).send('Server error');
    }
};

export const getProducts = async (req, res) => {
    const products = await services.allProducts();
    res.render('products', { title: 'Products', products, user: req.session.user });
};

export const getProductDetail = async (req, res) => {
    try {
        const product = await services.findProductById(req.params.id);
        if (!product) {
            return res.status(404).render('404', { title: 'Product Not Found', user: req.session.user });
        }
        return res.status(200).render('product', { title: product.product_name, product, user: req.session.user });
    } catch (err) {
        console.error('Error loading product detail:', err);
        return res.status(500).send('Server error');
    }
};

export const getSuccess = (req, res) => {
    res.status(200).render('200', { title: 'Success', user: req.session.user });
};

export const getNotFound = (req, res) => {
    res.status(404).render('404', { title: 'Page Not Found', user: req.session.user });
};

// filter use getApiProducts
export const getApiProducts = async (req, res) => {
    try {
        const { search, category, maxPrice, minPrice } = req.query;
        const products = await services.filteredProducts({ search, category, maxPrice, minPrice });
        
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
