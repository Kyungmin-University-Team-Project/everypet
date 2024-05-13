import React, { useEffect, useState } from 'react';
import styles from './ProductPage.module.css';
import Header from '../../layout/Header/Header';
import Fixedheader from '../../layout/Header/Fixedheader';
import Productcategory from '../../layout/category/Productcategory';
import ItemList from '../../components/common/ItemList';
import DetailedCategory from '../../components/common/DetailedCategory';

const ProductPage = ({ category }: any) => {
  const [categoryDetails, setCategoryDetails] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategoryDetails();
  }, [category]); // Dependency array with 'category' to re-trigger when category changes

  const fetchCategoryDetails = async () => {
    try {
      const response = await fetch(
        `/public/mock/${category}_detail_categories.json`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCategoryDetails(data.detailedCategories);
    } catch (error) {
      console.error('Failed to fetch category details:', error);
    }
  };

  return (
    <div>
      <Fixedheader />
      <Header />
      <Productcategory />

      <div className={styles.container}>
        <div className={styles.inner}>
          {/* DetailedCategory component now receives categoryDetails as a prop */}
          <DetailedCategory details={categoryDetails} />

          <div>asdad</div>
          <div>asdad</div>
          <div>asdad</div>
          <ItemList />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
