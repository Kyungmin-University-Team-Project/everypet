import {NavigateFunction} from "react-router-dom";

interface Item {
    productId: string;
    name: string;
    price: number;
    discount: number;
    recommended: number;
    reviewCount: number;
    imageUrl: string;
}

export const handleViewDetails = (navigate: NavigateFunction, item: Item) => {
    console.log(item.name, ': 해당상품 페이지로 이동');
    navigate('/moreInformation', {
        state: {
            item
        }
    });
};
