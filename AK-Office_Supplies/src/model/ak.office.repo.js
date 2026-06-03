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

export const getProductById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM products WHERE product_id = ?',
        [id]
    );
    return rows[0]; 
};

// filter
export const getFilteredProducts = async ({ search, maxPrice }) => {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (search) {
        query += ' AND product_name LIKE ?';
        params.push(`%${search}%`);
    }

    if (maxPrice) {
        query += ' AND price <= ?';
        params.push(Number(maxPrice));
    }

    const [rows] = await pool.query(query, params);
    return rows;
};