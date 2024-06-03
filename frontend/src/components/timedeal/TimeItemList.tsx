import React from 'react';
import TimeItem from './TimeItem';
import styles from './TimeItemList.module.css';

const TimeItemList = () => {
    const items = [
        {
            timeLeft: 12540,
            image: require('../../assets/img/product_image/dog_food_1.png'),
            discountedPrice: '15,900',
            originalPrice: '20,500',
            description: '[특가 15,900원] 강아지 사료 10kg',
            rating: 5,
            reviews: '1,713',
            details: '무료배송 · 11pay 최대150P적립 · 793개 남음',
            coupon: '1,000',
            couponDescription: '강아지 사료 중복 쿠폰',
        },
        {
            timeLeft: 10500,
            image: require('../../assets/img/product_image/dog_food_2.png'),
            discountedPrice: '13,900',
            originalPrice: '18,500',
            description: '[특가 13,900원] 강아지 사료 5kg',
            rating: 4,
            reviews: '1,320',
            details: '무료배송 · 11pay 최대120P적립 · 500개 남음',
            coupon: '1,000',
            couponDescription: '강아지 사료 중복 쿠폰',
        },
        {
            timeLeft: 86400,
            image: require('../../assets/img/product_image/dog_food_3.png'),
            discountedPrice: '12,900',
            originalPrice: '16,500',
            description: '[특가 12,900원] 강아지 사료 7kg',
            rating: 4,
            reviews: '890',
            details: '무료배송 · 11pay 최대100P적립 · 250개 남음',
            coupon: '1,000',
            couponDescription: '강아지 사료 중복 쿠폰',
        },
        {
            timeLeft: 5400,
            image: require('../../assets/img/product_image/dog_food_4.png'),
            discountedPrice: '9,900',
            originalPrice: '14,500',
            description: '[특가 9,900원] 강아지 사료 3kg',
            rating: 3,
            reviews: '450',
            details: '무료배송 · 11pay 최대80P적립 · 100개 남음',
            coupon: '500',
            couponDescription: '강아지 사료 중복 쿠폰',
        },
        {
            timeLeft: 72000,
            image: require('../../assets/img/product_image/dog_food_5.png'),
            discountedPrice: '19,900',
            originalPrice: '25,500',
            description: '[특가 19,900원] 강아지 사료 8kg',
            rating: 5,
            reviews: '2,040',
            details: '무료배송 · 11pay 최대200P적립 · 300개 남음',
            coupon: '1,500',
            couponDescription: '강아지 사료 중복 쿠폰',
        },
    ];

    return (
        <div className={styles.timeItemList}>
            {items.map((item, index) => (
                <TimeItem key={index} item={item}/>
            ))}
        </div>
    );
};

export default TimeItemList;
