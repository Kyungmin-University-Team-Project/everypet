import React, { useEffect } from 'react';
import styles from './Cupon.module.css';
import Header from '../../layout/Header/Header';
import Fixedheader from '../../layout/Header/Fixedheader';
import Productcategory from '../../layout/category/Productcategory';
import ItemList from '../../components/common/ItemList';
import DetailedCategory from '../../components/common/DetailedCategory';
import HomeAd from '../../components/home/HomeAd';

import img1 from '../../assets/img/main_img/add1.jpg';

const adsData = [
  {
    title: '이달의 브랜드 미즈, 우리 강아지 최애간식 1번',
    imageUrl: img1,
  },
];

const Cupon = ({ category }: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]); // Dependency array with 'category' to re-trigger when category changes

  // 무한 스크롤 기능 넣기

  return (
    <div>
      <Fixedheader />
      <Header />
      <Productcategory />

      <div className={styles.container}>
        <div className={styles.inner}>
          <ItemList />
        </div>
      </div>
    </div>
  );
};

export default Cupon;
