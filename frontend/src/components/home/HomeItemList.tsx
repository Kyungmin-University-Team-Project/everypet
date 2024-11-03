import React from 'react';
import {Product} from "../../typings/product";
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";
import ErrorComponent from "../../utils/reactQuery/ErrorComponent";
import Item from "../common/Item";
import axios from "axios";
import NotFoundProduct from "../../utils/reactQuery/NotFoundProduct";
import {useQuery} from "@tanstack/react-query";

const HomeItemList = ({brandName}: { brandName: string }) => {
    const orderBy = 'popularity';
    const page = 1;
    const pageSize = 8;

    const fetchItems = async (): Promise<Product[]> => {
        const response = await axios.get(`/product/search/${brandName}/${orderBy}/${page}/${pageSize}`);
        return response.data;
    };

    const {
        data: product,
        error,
        isPending
    } = useQuery<Product[], Error>({
        // 동일한 키로 요청시 재호출 하지 않음(캐싱값 사용)
        // 브랜드가 변경되지 않는이상 캐싱값 사용
        queryKey: [brandName],
        queryFn: fetchItems,
    });

    if (isPending) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <ErrorComponent message={error.message}/>;
    }

    return (
        <>
            {product && product.length > 0 ? (
                product.map((item) => (
                    <Item
                        key={item.productId}
                        productId={item.productId}
                        name={item.productName}
                        price={item.productPrice}
                        discount={item.productDiscountRate}
                        recommended={item.productViews}
                        reviewCount={item.numberOfProduct}
                        imageUrl={`https://storage.googleapis.com/every_pet_img/${item.productId}`}
                    />
                ))
            ) : (
                <NotFoundProduct/>
            )}
        </>
    );
};

export default HomeItemList;