import { getAllProducts } from "../model/ak.office.repo.js";
import * as repo from "../model/ak.office.repo.js";

const data = await getAllProducts();
// featured products
//ids of products to feature on the landing page: pens, printer paper, sticky notes
const FEATURED_IDS = [1, 4, 5];

export const allProducts = () => data;

export const findProductById = id => {
    const numId = Number(id);
    return data.find(p => p.product_id === numId);
}

export const featuredProducts = () => data.filter(p => FEATURED_IDS.includes(p.id));

export const addProduct = product => {

    data.push(product);
};
export const productById = async (id) => await repo.getProductById(id);

// filter
export const filteredProducts = async ({ search, maxPrice }) =>
     await repo.getFilteredProducts({ search, maxPrice });
