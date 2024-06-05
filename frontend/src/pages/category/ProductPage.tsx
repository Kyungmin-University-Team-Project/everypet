import React from 'react';
import {useQuery} from 'react-query';
import styles from './ProductPage.module.css';
import Header from '../../layout/Header/Header';
import Fixedheader from '../../layout/Header/Fixedheader';
import Productcategory from '../../layout/category/Productcategory';
import ItemList from '../../components/common/ItemList';
import DetailedCategory from '../../components/common/DetailedCategory';
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";
import ErrorComponent from "../../utils/reactQuery/ErrorComponent";


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

const ProductPage = ({category}: { category: string }) => {
    const {data, error, isLoading} = useQuery<{ detailedCategories: DetailedCategory[] }, Error>(
        ['categoryDetails', category],
        () => fetchCategoryDetails(category)
    );

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]); // Dependency array with 'category' to re-trigger when category changes

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <ErrorComponent message={error.message}/>;
    }

    return (
        <div>
            <Fixedheader/>
            <Header/>
            <Productcategory/>

            <div className={styles.container}>
                <div className={styles.inner}>
                    {/* DetailedCategory component now receives data.detailedCategories as a prop */}
                    <DetailedCategory details={data!.detailedCategories}/>

                    <ItemList/>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
