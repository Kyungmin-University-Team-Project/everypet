import axiosInstance from "../error/axiosInstance";

export interface CartItem {
    cartId: number;
    cartQuantity: number;
    discountRate: number;
    price:number;
    productImg:string;
    productName:string;
}

export const addToCart = async (productId: string, quantity: number = 1) => {
    try {
        await axiosInstance.post('/cart/add', {
            productId: productId,
            cartQuantity: quantity
        });
        alert("장바구니에 추가되었습니다.");
    } catch (error) {
        // 여기에는 수량을 늘리거나 다른 로직 추가하기
        alert("장바구니에 추가하는데 실패했습니다.");
    }
};

export const fetchCartItems = async (): Promise<CartItem[]> => {
    try {
        const response = await axiosInstance.post<CartItem[]>('/cart/list', {});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCartItem = async (productId: number) => {
    try {
        await axiosInstance.post('/cart/delete', {productId});
    } catch (error) {
        throw error;
    }
};
