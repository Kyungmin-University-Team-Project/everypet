import React, {useRef} from 'react';
import Slider from 'react-slick';
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';
import styles from './Maincarousel.module.css';
import './slick-theme.css';
import './slick.css';

const Maincarousel = () => {
    const sliderRef = useRef<any>(null);

    const bannerUrls = [
        require('../../../assets/img/banner/banner_1.png'),
        require('../../../assets/img/banner/banner_2.png'),
        require('../../../assets/img/banner/banner_3.png'),
        require('../../../assets/img/banner/banner_4.png'),
        require('../../../assets/img/banner/banner_5.png'),
        require('../../../assets/img/banner/banner_6.png'),
        require('../../../assets/img/banner/banner_7.png'),
        require('../../../assets/img/banner/banner_8.png'),
        require('../../../assets/img/banner/banner_9.png'),
    ];

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
                {bannerUrls.map((bannerUrl, index) => (
                    <div key={index} className={styles.item}>
                        <img
                            className={styles.img}
                            src={bannerUrl}
                            alt={`Banner ${index + 1}`}
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
