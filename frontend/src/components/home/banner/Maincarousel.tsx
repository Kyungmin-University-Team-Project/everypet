import React from 'react';
import Slider from 'react-slick';
import styles from './Maincarousel.module.css';
import './slick-theme.css';
import './slick.css';

const Maincarousel = () => {
  // 이미지는 나중에 서버에서 받아오기
  // 배너링크도 포함하기

  const bannerUrls = [
    require('../../../assets/img/banner/banner_1.jpg'),
    require('../../../assets/img/banner/banner_2.jpg'),
    require('../../../assets/img/banner/banner_3.jpg'),
    require('../../../assets/img/banner/banner_4.jpg'),
    require('../../../assets/img/banner/banner_5.jpg'),
    require('../../../assets/img/banner/banner_6.jpg'),
    require('../../../assets/img/banner/banner_7.png'),
    require('../../../assets/img/banner/banner_8.png'),
    require('../../../assets/img/banner/banner_9.png'),
  ];

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const moveBannerLink = (e: any) => {
    console.log(e.target);
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {bannerUrls.map((bannerUrl, index) => (
          <div key={index} className={styles.itme}>
            <img
              className={styles.img}
              src={bannerUrl}
              alt={`Banner ${index + 1}`}
              onClick={moveBannerLink}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Maincarousel;
