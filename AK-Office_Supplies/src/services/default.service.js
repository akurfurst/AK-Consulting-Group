import { getFeaturedProduct } from '../model/default.repo.js';

export const featuredProduct = async () => {
    return await getFeaturedProduct();
};