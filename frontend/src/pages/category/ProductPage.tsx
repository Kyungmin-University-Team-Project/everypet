import React, { useEffect, useState } from 'react';
import styles from './ProductPage.module.css';

import DetailedCategory from '../../components/common/DetailedCategory';
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";
import { DetailedCategoryList } from "../../typings/product";

const fetchCategoryDetails = async (category: string): Promise<{ detailedCategories: DetailedCategoryList[] }> => {
    const response = await fetch(`/mock/${category}_detail_categories.json`);

    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const ProductPage = ({ category }: { category: string }) => {
    const [data, setData] = useState<{ detailedCategories: DetailedCategoryList[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 추가

    useEffect(() => {
        const getCategoryDetails = async () => {
            setIsLoading(true);  // 데이터 로딩 시작
            try {
                const result = await fetchCategoryDetails(category);
                setData(result);
            } catch (error) {
                console.error('Failed to fetch category details:', error);
            } finally {
                setIsLoading(false);  // 데이터 로딩 완료
            }
        };

        // 비동기 함수를 즉시 실행
        (async () => {
            await getCategoryDetails();
        })();
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
                            {data && <DetailedCategory details={data.detailedCategories} />} {/* data에 접근 시 detailedCategories를 전달 */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
