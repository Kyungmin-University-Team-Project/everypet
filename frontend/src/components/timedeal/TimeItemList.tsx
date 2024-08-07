import React from 'react';
import TimeItem from './TimeItem';
import styles from './TimeItemList.module.css';

const TimeItemList = () => {
    const items = [
        {
            productId: '1',
            timeLeft: 12540,
            imageUrl: require('../../assets/img/product_image/dog_food_1.png'),
            price: 20500,
            discount: 22,
            description: '잘먹잘싸 강아지 사료 10kg',
            rating: 5,
            reviewCount: 1713,
            details: '무료배송 · 11pay 최대150P적립 · 793개 남음',
            coupon: '1,000',
            couponDescription: '강아지 사료 중복 쿠폰',
        },
        {
            productId: '2',
            timeLeft: 10500,
            imageUrl: require('../../assets/img/product_image/dog_food_2.png'),
            price: 18500,
            discount: 25,
            description: '[DOG FOOD 특별할인] 강아지 사료 5kg',
            rating: 4,
            reviewCount: 1320,
            details: '무료배송 · 11pay 최대120P적립 · 500개 남음',
            coupon: '1,000',
            couponDescription: '강아지 사료 중복 쿠폰',
        },
        {
            productId: '3',
            timeLeft: 86400,
            imageUrl: require('../../assets/img/product_image/dog_food_3.png'),
            price: 16500,
            discount: 22,
            description: '드림독 특가! 강아지 사료 7kg',
            rating: 4,
            reviewCount: 890,
            details: '무료배송 · 11pay 최대100P적립 · 250개 남음',
            coupon: '1,000',
            couponDescription: '강아지 사료 중복 쿠폰',
        },
        {
            productId: '4',
            timeLeft: 5400,
            imageUrl: require('../../assets/img/product_image/dog_food_4.png'),
            price: 14500,
            discount: 32,
            description: 'DOG FOOD 연어맛 3KG',
            rating: 3,
            reviewCount: 450,
            details: '무료배송 · 11pay 최대80P적립 · 100개 남음',
            coupon: '500',
            couponDescription: '강아지 사료 중복 쿠폰',
        },
        {
            productId: '5',
            timeLeft: 72000,
            imageUrl: require('../../assets/img/product_image/dog_food_6.png'),
            price: 25500,
            discount: 22,
            description: '강아지 사료 8kg',
            rating: 5,
            reviewCount: 2040,
            details: '무료배송 · 11pay 최대200P적립 · 300개 남음',
            coupon: '1,500',
            couponDescription: '강아지 사료 중복 쿠폰',
        },
    ];

    return (
        <div className={styles.timeItemList}>
            {items.map((item) => (
                <TimeItem key={item.productId} item={item}/>
            ))}
        </div>
    );
};

export default TimeItemList;
