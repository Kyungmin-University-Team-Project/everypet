import React from 'react';
import styles from './Home.module.css';
import Maincarousel from '../../components/home/banner/Maincarousel';
import Quicknav from '../../components/home/quicknav/Quicknav';

import img1 from '../../assets/img/main_img/add1.jpg';
import img2 from '../../assets/img/main_img/add2.jpg';
import img3 from '../../assets/img/main_img/add3.jpg';
import HomeAd from '../../components/home/HomeAd';

const adsData = [
    {
        title: '이달의 브랜드 미즈, 우리 강아지 최애간식 1번',
        imageUrl: img1,
        brandName:'미즈'
    },
    {
        title: '요즘 견싸템 모음!',
        imageUrl: img2,
        brandName:'오블'
    },
    {
        title: '부동의 1위 로얄 케인',
        imageUrl: img3,
        brandName:'케인'
    },
];

const Home: React.FC = () => {

    return (
        <div className={styles.container}>
            <div className={styles.home__top}>
                <Maincarousel/>
                <Quicknav/>
            </div>
            <div className={styles.brand__ad}>
                {adsData.map((ad) => (
                    <HomeAd key={ad.title} title={ad.title} imageUrl={ad.imageUrl} brandName={ad.brandName}/>
                ))}
            </div>
        </div>
    );
};

export default Home;
