import React, {useState, useEffect} from 'react';
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

const SearchItemList: React.FC<SearchItemListProps> = ({searchQuery}) => {
    const [orderBy, setOrderBy] = useState<string>('popularity'); // 기본 정렬 기준
    const [page, setPage] = useState<number>(1); // 기본 페이지
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const pageSize = 10; // 페이지 당 아이템 수

    const fetchItems = async () => {
        setLoading(true);
        setError(null); // 초기화
        try {
            const response = await axios.get(`/product/search/${searchQuery}/${orderBy}/${page}/${pageSize}`,{},);
            console.log(response)
            setData(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [searchQuery, page]);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(event.target.value);
    };

    // 여긴 나중에 바꿈
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <ErrorComponent message={error}/>;
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
