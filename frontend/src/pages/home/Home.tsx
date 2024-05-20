import React from 'react';
import styles from './Home.module.css';
import Maincarousel from '../../components/home/banner/Maincarousel';
import Quicknav from '../../components/home/quicknav/Quicknav';

import Footer from '../../components/home/Footer';

import img1 from '../../assets/img/main_img/add1.jpg';
import img2 from '../../assets/img/main_img/add2.jpg';
import img3 from '../../assets/img/main_img/add3.jpg';
import img4 from '../../assets/img/main_img/add4.jpg';
import HomeAd from '../../components/home/HomeAd';

const adsData = [
  {
    title: '이달의 브랜드 미즈, 우리 강아지 최애간식 1번',
    imageUrl: img1,
  },
  {
    title: '이달의 브랜드 미즈, 우리 강아지 최애간식 2번',
    imageUrl: img2,
  },
  {
    title: '이달의 브랜드 미즈, 우리 강아지 최애간식 3번',
    imageUrl: img3,
  },
  {
    title: '이달의 브랜드 미즈, 우리 강아지 최애간식 4번',
    imageUrl: img4,
  },
];

const Home = () => {
  return (
    <div>
      <Maincarousel />
      <Quicknav />
      <div className={styles.brand__ad}>
        {adsData.map((ad, index) => (
          <HomeAd key={index} title={ad.title} imageUrl={ad.imageUrl} />
        ))}
      </div>

      <div className={styles.box} />
      <div className={styles.box} />
      <div className={styles.box} />

      <Footer />
    </div>
  );
};

export default Home;
