import React from 'react';
import styles from './Home.module.css';
import Maincarousel from '../../components/home/banner/Maincarousel';
import Quicknav from '../../components/home/quicknav/Quicknav';
import img1 from '../../assets/img/main_img/add1.png';
import ItemList from '../../components/common/ItemList';

const Home = () => {
  return (
    <div>
      <Maincarousel />
      <Quicknav />
      <div className={styles.container}>
        <div className={styles.inner}>
          <span className={styles.title}>
            이달의 브랜드 미즈, 우리 강아지 최애간식
          </span>
          <img className={styles.main__img} src={img1} alt='asd' />

          <div className={styles.rightAlign}>
            <button className={styles.view__all}>전체보기</button>
          </div>
          <ItemList />
        </div>
      </div>

      <div className={styles.box} />
      <div className={styles.box} />
      <div className={styles.box} />
    </div>
  );
};

export default Home;
