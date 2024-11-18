export interface Product {
    memberId: string;
    name: string;
    numberOfProduct: number;
    productDescriptionImg: string;
    productDiscountRate: number;
    productId: string;
    productImg: string;
    productMainCategory: string;
    productName: string;
    productPrice: number;
    productRatingAvg: number;
    productRegistrationDate: string;
    productSalesStatusYN: string;
    productSubCategory: string;
    productViews: number;
    reviewCount: number;
    salesCount: number;
}

export interface CategoryProductList {
    productMainCategory: string,
    productSubCategory: string,
    orderBy: string,
    page: number,
    pageSize: 10
}

export interface DetailedCategoryList {
    name: string;
    tag: string;
    link:string;
}

export interface CartItem {
    cartId: string;
    productId:string;
    cartQuantity: number;
    productDiscountRate: number;
    productPrice: number;
    productImg: string;
    productName: string;
}