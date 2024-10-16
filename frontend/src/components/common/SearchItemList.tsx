import React, {useState} from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';
import Item from './Item';
import styles from './SearchItemList.module.css';
import LoadingSpinner from '../../utils/reactQuery/LoadingSpinner';
import ErrorComponent from '../../utils/reactQuery/ErrorComponent';
import {Product} from '../../typings/product';
import {VscSearchStop} from 'react-icons/vsc';
import DropDown from "./DropDown";

interface SearchItemListProps {
    searchQuery: string;
}


// home에서 보여주는 리스트에선 keyword에 브랜드 명을 넣어주기
const SearchItemList: React.FC<SearchItemListProps> = ({searchQuery}) => {
    const [orderBy, setOrderBy] = useState<string>('popularity'); // 기본 정렬 기준
    const [page, setPage] = useState<number>(1); // 기본 페이지
    const pageSize = 10; // 페이지 당 아이템 수

    const fetchItems = async (): Promise<Product[]> => {
        const params = {
            keyword: searchQuery,
            orderBy,
            page,
            pageSize,
        };
        const response = await axios.get(`/product/search/${searchQuery}/${orderBy}/${page}/${pageSize}`);
        return response.data;
    };

    const { data, error, isLoading } = useQuery<Product[], Error>(['searchProducts', searchQuery, orderBy, page], fetchItems);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(event.target.value);
    };

    // 여긴 나중에 바꿈
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorComponent message={error.message} />;
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

export default SearchItemList;
