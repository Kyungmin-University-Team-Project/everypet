import axios from 'axios';
import { Product } from '../../typings/product';

interface FetchProductListParams {
    orderBy: string;
    page: number;
    pageSize: number;
    searchQuery?: string; // searchQuery 추가
    productCategory?: string;
}

export const fetchProductList = async (params: FetchProductListParams): Promise<Product[]> => {
    const { orderBy, page, pageSize, searchQuery, productCategory } = params;
    const response = await axios.get('/product-list', {
        params: {
            orderBy,
            page,
            pageSize,
            searchQuery,
            productCategory,
        },
    });
    return response.data;
};
