import React from 'react';
import styles from './HomeAd.module.css';
import {FaChevronRight} from 'react-icons/fa6';
import HomeItemList from "./HomeItemList";

interface HomeAdProps {
    title: string,
    imageUrl: string,
    brandName: string
}

const HomeAd = ({imageUrl, brandName}: HomeAdProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <img
                    className={styles.main__img}
                    src={imageUrl}
                    alt='main advertisement'
                />

                <div className={styles.rightAlign}>
                    {/*여기는 검색으로 바꾸기*/}
                    <span className={styles.view__all}>
            전체보기
            <FaChevronRight/>
          </span>
                </div>
                <HomeItemList brandName={brandName}/>
            </div>
        </div>
    );
};

export default HomeAd;
