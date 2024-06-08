// fetchProductList 함수 정의
import {Params} from "../../typings/utils";
import axios from "axios";

export const fetchProductList = async (params: Params) => {
    try {
        const response = await axios.get('/product-list', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;  // 필요에 따라 에러를 다시 던질 수 있습니다.
    }
};