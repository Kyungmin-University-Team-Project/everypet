import React, { useEffect, useState } from 'react';
import styles from './ProductPage.module.css';
import Header from '../../layout/Header/Header';
import Fixedheader from '../../layout/Header/Fixedheader';
import Productcategory from '../../layout/category/Productcategory';
import ItemList from '../../components/common/ItemList';
import DetailedCategory from '../../components/common/DetailedCategory';

interface DetailedCategory {
    id: number;
    name: string;
    // 추가적인 속성이 있을 수 있음
}

const fetchCategoryDetails = async (category: string): Promise<{ detailedCategories: DetailedCategory[] }> => {
    const response = await fetch(`/mock/${category}_detail_categories.json`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const ProductPage = ({ category }: { category: string }) => {
    const [data, setData] = useState<{ detailedCategories: DetailedCategory[] } | null>(null);

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const result = await fetchCategoryDetails(category);
                setData(result);
            } catch (error) {
                console.error('Failed to fetch category details:', error);
            }
        };

        // 비동기 함수를 즉시 실행
        // 프로미스 반환 경고 때문에 즉시 실행 시킴
        (async () => {
            await getCategoryDetails();
        })();
    }, [category]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]); // Dependency array with 'category' to re-trigger when category changes

    return (
        <div>
            <Fixedheader />
            <Header />
            <Productcategory />
            <div className={styles.container}>
                <div className={styles.inner}>
                    {data && <DetailedCategory details={data.detailedCategories} />}
                    <ItemList />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
