import axios from 'axios';
import {CategoryProductList, Product} from '../../typings/product';
import {API_URL} from "../../api/api";


export const fetchProductList = async (params: CategoryProductList): Promise<Product[]> => {

    const {productMainCategory, productSubCategory, orderBy, page, pageSize} = params;

    const response = await axios.get(`${API_URL}/product/list/${productMainCategory}/${productSubCategory}/${orderBy}/${page}/${pageSize}`);

    return response.data;
};
