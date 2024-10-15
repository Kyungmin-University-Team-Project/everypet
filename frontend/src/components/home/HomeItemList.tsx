import React, {useState} from 'react';
import {Product} from "../../typings/product";
import {useQuery} from "react-query";
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";
import ErrorComponent from "../../utils/reactQuery/ErrorComponent";
import DropDown from "../common/DropDown";
import styles from "../common/ItemList.module.css";
import Item from "../common/Item";
import axios from "axios";
import {VscSearchStop} from "react-icons/vsc";

const HomeItemList = ({ brandName }: { brandName: string }) => {
    const [orderBy, setOrderBy] = useState<string>('popularity'); // 기본 정렬 기준
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

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(event.target.value);
    };

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <ErrorComponent message={error.message}/>;
    }

    return (
        <>
            <DropDown orderBy={orderBy} handleSortChange={handleSortChange}/>

            <div className={`${styles.container} ${data && data.length === 0 ? styles.noResultsContainer : ''}`}>
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
                    <div className={styles.noResults}>
                        <VscSearchStop className={styles.noResults__icon}/>
                        <span className={styles.noResults__text}>검색 결과가 없습니다.</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default HomeItemList;