import pool from './db.connect.js';

export const getFeaturedProduct = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM products WHERE product_id = 1'
    );
    return rows[0];
};

export const getAllProducts = async () => {
    const [data] = await pool.query(
        'SELECT * FROM products'
    );
    return data
};