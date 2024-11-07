import React, {useRef} from 'react';
import Slider from 'react-slick';
import styles from './Maincarousel.module.css';
import './slick-theme.css';
import './slick.css';
import {AiOutlineLeft, AiOutlineRight} from "../../../icons/Icons";

// 배너와 상품 정보를 담아놓은 데이터셋 필요
const bannerUrls = [
    {url: require('../../../assets/img/banner/banner_1.jpg'), name: '배너 1'},
    {url: require('../../../assets/img/banner/banner_2.jpg'), name: '배너 2'},
    {url: require('../../../assets/img/banner/banner_3.jpg'), name: '배너 3'},
    {url: require('../../../assets/img/banner/banner_4.jpg'), name: '배너 4'},
    {url: require('../../../assets/img/banner/banner_5.jpg'), name: '배너 5'},
    {url: require('../../../assets/img/banner/banner_6.jpg'), name: '배너 6'},
];

const Maincarousel = () => {
    const sliderRef = useRef<any>(null);

    const settings = {
        dots: true,
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
        </div>
    );
};

export default Maincarousel;
