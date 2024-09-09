import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Item from './Item';
import styles from './ItemList.module.css';
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";
import ErrorComponent from "../../utils/reactQuery/ErrorComponent";
import { fetchProductList } from "../../utils/product/fetchProductList";
import { Product } from "../../typings/Category";
import { RootState } from '../../redux/store/rootReducer';

const ItemList = () => {
    const clickedCategory = useSelector((state: RootState) => state.category.clickedCategory);

    const fetchItems = async (): Promise<Product[]> => {
        const params = {
            orderBy: 'PRODUCT_VIEWS DESC',
            page: 1,
            pageSize: 10,
            productCategory: `${clickedCategory}%`
        };
        console.log("Fetching items with params:", params);
        return await fetchProductList(params);
    };

    const { data, error, isLoading } = useQuery<Product[], Error>(['products', clickedCategory], fetchItems);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorComponent message={error.message} />;
    }

    return (
        <div className={styles.container}>
            {data?.map((item) => (
                <Item
                    key={item.productId}
                    productId={item.productId}
                    name={item.productName}
                    price={item.productPrice}
                    discount={item.productDiscountRate}
                    recommended={item.productViews}
                    reviewCount={item.numberOfProduct}
                    imageUrl={`https://storage.googleapis.com/every_pet_img/${item.productId}`} // 이미지 URL 수정
                />
            ))}
        </div>
    );
};

export default ItemList;
