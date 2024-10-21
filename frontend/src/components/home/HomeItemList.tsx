import React from 'react';
import {Product} from "../../typings/product";
import {useQuery} from "react-query";
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";
import ErrorComponent from "../../utils/reactQuery/ErrorComponent";
import Item from "../common/Item";
import axios from "axios";
import NotFoundProduct from "../../utils/reactQuery/NotFoundProduct";

const HomeItemList = ({brandName}: { brandName: string }) => {
    const orderBy = 'popularity';
    const page = 1;
    const pageSize = 8;

    const fetchItems = async (): Promise<Product[]> => {
        const response = await axios.get(`/product/search/${brandName}/${orderBy}/${page}/${pageSize}`);
        return response.data;
    };

    const {
        data,
        error,
        isLoading
    } = useQuery<Product[], Error>(['searchProducts', brandName, orderBy, page], fetchItems);

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <ErrorComponent message={error.message}/>;
    }

    return (
        <>
            {data && data.length > 0 ? (
                data.map((item) => (
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