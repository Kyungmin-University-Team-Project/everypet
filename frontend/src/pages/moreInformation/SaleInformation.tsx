import React from 'react';

export interface ProductDetails {
    memberId: string;
    numberOfProduct: number;
    productCategory: string;
    productChangedDate: string;
    productDiscountRate: number;
    productId: string;
    productName: string;
    productPrice: number;
    productRegistrationDate: string;
    productSalesStatusYn: string;
    productViews: number;
}

interface InformationProps {
    productDetails: ProductDetails | null;
}

const SaleInformation: React.FC<InformationProps> = ({ productDetails }) => {
    if (!productDetails) {
        return <div>Loading...</div>;
    }

    const {
        memberId,
        numberOfProduct,
        productCategory,
        productChangedDate,
        productDiscountRate,
        productId,
        productName,
        productPrice,
        productRegistrationDate,
        productSalesStatusYn,
        productViews,
    } = productDetails;

    const formattedImageUrl = `https://storage.googleapis.com/every_pet_img/${productId}-description`;

    return (
        <div>
            <h2>{productName}</h2>
            <img src={formattedImageUrl} alt={productName} />
            <p><strong>Product ID:</strong> {productId}</p>
            <p><strong>Member ID:</strong> {memberId}</p>
            <p><strong>Number of Products:</strong> {numberOfProduct}</p>
            <p><strong>Category:</strong> {productCategory}</p>
            <p><strong>Price:</strong> {productPrice}원</p>
            <p><strong>Discount Rate:</strong> {productDiscountRate}%</p>
            <p><strong>Views:</strong> {productViews}</p>
            <p><strong>Sales Status:</strong> {productSalesStatusYn}</p>
            <p><strong>Registration Date:</strong> {productRegistrationDate}</p>
            <p><strong>Last Changed Date:</strong> {productChangedDate || 'N/A'}</p>
        </div>
    );
};

export default SaleInformation;
