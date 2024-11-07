import React from 'react';
import {useLocation} from 'react-router-dom';
import styles from './SearchPage.module.css';
import SearchItemList from "../../components/header/SearchItemList";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
    const query = useQuery();
    const searchQuery = query.get('query') || '';

    return (
        <div className={styles.container}>
            <p className={styles.searchWord}>
                <span>검색어 : {searchQuery}</span>
            </p>
            <div className={styles.inner}>
                <SearchItemList searchQuery={searchQuery}/>
            </div>
        </div>
    );
};

export default SearchPage;
