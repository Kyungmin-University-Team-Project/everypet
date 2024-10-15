import React, {useEffect} from 'react';
import styles from './Home.module.css';
import Maincarousel from '../../components/home/banner/Maincarousel';
import Quicknav from '../../components/home/quicknav/Quicknav';

import img1 from '../../assets/img/main_img/add1.jpg';
import img2 from '../../assets/img/main_img/add2.jpg';
import img3 from '../../assets/img/main_img/add3.jpg';
import HomeAd from '../../components/home/HomeAd';
import {fetchProductList} from "../../utils/product/fetchProductList";

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
];

const Home: React.FC = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = {
                    orderBy: 'PRODUCT_VIEWS ASC',
                    page: 1,
                    pageSize: 2,
                    productCategory: '강아지%'
                };
                // const data = await fetchProductList(params); // 유틸함수로 리스트 이미지 가져오기
                // console.log("연결은 성공 더미 현재 데이터 없음")
                // console.log(data); // 서버로부터 받은 데이터 출력
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <Maincarousel/>
            <Quicknav/>
            <div className={styles.brand__ad}>
                {adsData.map((ad) => (
                    <HomeAd key={ad.title} title={ad.title} imageUrl={ad.imageUrl}/>
                ))}
            </div>
        </div>
    );
};

export default Home;
