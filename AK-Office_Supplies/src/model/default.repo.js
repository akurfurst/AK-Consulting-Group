import db from './db.connect.js';

export const getFeaturedProduct = async () => {
    const [rows] = await db.query(
        'SELECT * FROM products WHERE product_id = 1'
    );
    return rows[0];
};