import React, {useRef} from 'react';
import Slider from 'react-slick';
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';
import styles from './Maincarousel.module.css';
import './slick-theme.css';
import './slick.css';

// 배너와 상품 정보를 담아놓은 데이터셋 필요
const bannerUrls = [
    {url: require('../../../assets/img/banner/banner_1.png'), name: '배너 1'},
    {url: require('../../../assets/img/banner/banner_2.png'), name: '배너 2'},
    {url: require('../../../assets/img/banner/banner_3.png'), name: '배너 3'},
    {url: require('../../../assets/img/banner/banner_4.png'), name: '배너 4'},
    {url: require('../../../assets/img/banner/banner_5.png'), name: '배너 5'},
    {url: require('../../../assets/img/banner/banner_6.png'), name: '배너 6'},
    {url: require('../../../assets/img/banner/banner_7.png'), name: '배너 7'},
    {url: require('../../../assets/img/banner/banner_8.png'), name: '배너 8'},
    {url: require('../../../assets/img/banner/banner_9.png'), name: '배너 9'},
];

const Maincarousel = () => {
    const sliderRef = useRef<any>(null);

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className={styles.container}>
            <Slider ref={sliderRef} {...settings}>
                {bannerUrls.map((banner) => (
                    <div key={banner.name} className={styles.item}>
                        <img
                            className={styles.img}
                            src={banner.url}
                            alt={banner.name}
                        />
                    </div>
                ))}
            </Slider>
            <div className={styles.controls}>
                <button
                    onClick={() => sliderRef.current.slickPrev()}
                    className={styles.left__arrow}
                >
                    <AiOutlineLeft size={30}/>
                </button>
                <button
                    onClick={() => sliderRef.current.slickNext()}
                    className={styles.right__arrow}
                >
                    <AiOutlineRight size={30}/>
                </button>
            </div>
        </div>
    );
};

export default Maincarousel;
