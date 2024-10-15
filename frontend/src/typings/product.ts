/**
 *  상품에 대한 정보
 * */
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
    // 임시 나중에 string 변경후 변수화
    orderBy: string,
    page: number,
    pageSize: 10
}

export interface DetailedCategoryList {
    name: string;
    tag: string;
}