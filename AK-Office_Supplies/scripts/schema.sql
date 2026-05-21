
/*Products Table*/
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    category VARCHAR(255), /*TODO: Change to foreign key for categorys table.*/
    description TEXT,
    image VARCHAR(255),
    price INT
);

/*TODO: Add categories, order_details, orders, users tables*/