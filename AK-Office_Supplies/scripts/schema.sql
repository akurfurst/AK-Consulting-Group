
/*Products Table*/
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255),
    category VARCHAR(255), /*TODO: Change to foreign key for categorys table.*/
    product_description TEXT,
    image_file VARCHAR(255),
    price INT
);

/*TODO: Add categories, order_details, orders, users tables*/