import axios from 'axios';
import {CategoryProductList, Product} from '../../typings/product';


export const fetchProductList = async (params: CategoryProductList): Promise<Product[]> => {

    const {productMainCategory, productSubCategory, orderBy, page, pageSize} = params;

    const response = await axios.get(`/product/list/${productMainCategory}/${productSubCategory}/${orderBy}/${page}/${pageSize}`);

    console.log(response.data)
    return response.data;
};
