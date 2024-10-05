/**
 *  상품에 대한 정보
 * */
export interface Product {
    productId: string;
    productName: string;
    productPrice: number;
    productDiscountRate: number;
    productViews: number;
    numberOfProduct: number;
    imageUrl?: string;
}