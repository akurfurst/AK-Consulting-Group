import * as repo from "../model/ak.office.repo.js";

// featured products
//ids of products to feature on the landing page: pens, printer paper, sticky notes
const FEATURED_IDS = [1, 4, 5];

export const allProducts = async () => await repo.getAllProducts();

export const findProductById = async (id) => await repo.getProductById(id);

export const featuredProducts = async () => {
    const data = await repo.getAllProducts();
    return data.filter(p => FEATURED_IDS.includes(p.product_id));
};

export const addProduct = async (product) => {
   //data.push(product);
};

export const productById = (id) => repo.getProductById(id);

// filter
export const filteredProducts = async ({ search, category, maxPrice, minPrice }) =>
     await repo.getFilteredProducts({ search, category, maxPrice, minPrice });
