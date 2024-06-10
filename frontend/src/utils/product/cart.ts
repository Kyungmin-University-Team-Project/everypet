// utils/cart.js
import axios from 'axios';
import {decryptToken} from "../common/tokenDecode";

export const addToCart = async (productId: string, quantity: number = 1) => {
    try {
        const encryptedToken = localStorage.getItem('access');
        if (!encryptedToken) {
            throw new Error("No access token found");
        }

        const token = decryptToken(encryptedToken); // 유틸리티 함수 사용

        console.log(productId)

        const response = await axios.post('/cart/add', {
            productId: productId,
            cartQuantity: quantity
        }, {
            headers: {
                'Content-Type': 'application/json',
                'access': token
            }
        });

        console.log("장바구니 추가 성공:", response.data);
        alert("장바구니에 추가되었습니다.");
    } catch (error) {
        console.error("장바구니 추가 실패:", error);
        alert("장바구니에 추가하는데 실패했습니다.");
    }
};
