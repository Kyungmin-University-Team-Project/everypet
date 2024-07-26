import React from 'react';
import { useQuery } from 'react-query';
import Item from './Item';
import styles from './SearchItemList.module.css';
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";
import ErrorComponent from "../../utils/reactQuery/ErrorComponent";
import { fetchProductList } from "../../utils/product/fetchProductList";
import { Product } from "../../typings/Category";

interface SearchItemListProps {
    searchQuery: string;
}

const SearchItemList: React.FC<SearchItemListProps> = ({ searchQuery }) => {
    const fetchItems = async (): Promise<Product[]> => {
        const params = {
            orderBy: 'PRODUCT_VIEWS DESC',
            page: 1,
            pageSize: 10,
            productCategory: `${searchQuery}%`
        };
        console.log("Fetching items with params:", params);
        return await fetchProductList(params);
    };

    const { data, error, isLoading } = useQuery<Product[], Error>(['searchProducts', searchQuery], fetchItems);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorComponent message={error.message} />;
    }

    return (
        <div className={styles.container}>
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
                        imageUrl={`https://storage.googleapis.com/every_pet_img/${item.productId}`} // 이미지 URL 수정
                    />
                ))
            ) : (
                <div className={styles.noResults}>검색 결과가 없습니다.</div>
            )}
        </div>
    );
};

export default SearchItemList;