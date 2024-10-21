import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductPage.module.css';

import DetailedCategory from '../../components/common/DetailedCategory';
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";
import { DetailedCategoryList } from "../../typings/product";
import {fetchCategoryDetails} from "../../utils/product/category";

const ProductPage = () => {
    const { category } = useParams<{ category: string }>(); // URL 파라미터에서 카테고리 읽기
    const [data, setData] = useState<{ detailedCategories: DetailedCategoryList[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 추가

    useEffect(() => {
        const getCategoryDetails = async () => {
            if (category) {
                setIsLoading(true);  // 데이터 로딩 시작
                try {
                    const result = await fetchCategoryDetails(category);
                    setData(result);
                } catch (error) {
                    console.error('Failed to fetch category details:', error);
                } finally {
                    setIsLoading(false);  // 데이터 로딩 완료
                }
            }
        };

        getCategoryDetails();
    }, [category]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.inner}>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            {data && <DetailedCategory details={data.detailedCategories} />}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
