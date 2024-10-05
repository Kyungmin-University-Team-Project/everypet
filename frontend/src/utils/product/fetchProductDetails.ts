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

export const fetchProductDetails = async (productId: string): Promise<ProductDetails> => {
    try {
        const response = await fetch(`/product?productId=${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const data = await response.json();

        const imageUrl = `${productId}-description`;

        return {
            ...data,
            imageUrl: `https://storage.googleapis.com/every_pet_img/${imageUrl}`
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
