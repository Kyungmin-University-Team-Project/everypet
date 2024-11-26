import React from 'react';
import styles from './Home.module.css';
import Maincarousel from '../../components/home/banner/Maincarousel';
import Quicknav from '../../components/home/quicknav/Quicknav';

import HomeAd from "../../components/home/HomeAd";

const adsData = [
    {
        title: '이달의 브랜드 미즈, 우리 강아지 최애간식 1번',
        imageUrl: '/img/main_img/add1.webp',
        brandName: '유저'
    },
    {
        title: '요즘 견싸템 모음!',
        imageUrl: '/img/main_img/add2.webp',
        brandName: '동물좋아상점'
    },
    {
        title: '부동의 1위 로얄 케인',
        imageUrl: '/img/main_img/add3.webp',
        brandName: '박민규'
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
