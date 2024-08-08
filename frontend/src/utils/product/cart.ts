// utils/cart.js
import axios from 'axios';
import {decryptToken} from "../common/tokenDecode";

export const addToCart = async (productId: string, quantity: number = 1) => {
    try {
        const token = decryptToken();

        if (!token) {
            throw new Error('토큰이 존재하지 않습니다.');
        }

        await axios.post('/cart/add', {
            productId: productId,
            cartQuantity: quantity
        }, {
            headers: {
                'Content-Type': 'application/json',
                'access': token
            }
        });

        alert("장바구니에 추가되었습니다.");
    } catch (error) {
        alert("장바구니에 추가하는데 실패했습니다.");
    }
};
