import React from 'react';
import Item from './Item';
import styles from './ItemList.module.css';

const ItemList = () => {
  // 아이템 리스트 props로 받기, 해당 데이터는 서버에서 받아옴

  // 아래는 mock 데이터
  const items = [
    {
      name: '[잘먹잘싸 봄맞이 할인] 소형견 사료',
      price: '29,987',
      recommended: 4, // Assuming 4 out of 5 stars
      reviewCount: 150,
      discount: 12,
      imageUrl: require('../../assets/img/product_image/dog_food_1.jpg'),
    },
    {
      name: '[DOG FOOD] 연어맛 강아지 사료',
      price: '24,350',
      recommended: 2, // Assuming 2 out of 5 stars
      reviewCount: 85,
      discount: 36,
      imageUrl: require('../../assets/img/product_image/dog_food_2.jpg'),
    },
    {
      name: 'DERMA 강아지 사료',
      price: '68,987',
      recommended: 5, // Full recommendation
      reviewCount: 200,
      discount: 40,
      imageUrl: require('../../assets/img/product_image/dog_food_3.jpg'),
    },
    {
      name: '[DOG FOOD] 치킨맛 강아지 사료',
      price: '59,987',
      recommended: 5, // Full recommendation
      reviewCount: 300,
      discount: 38,
      imageUrl: require('../../assets/img/product_image/dog_food_4.jpg'),
    },
    {
      name: '[잘먹잘싸 봄맞이 할인] 대형견 사료',
      price: '64,987',
      recommended: 3, // Assuming 3 out of 5 stars
      reviewCount: 100,
      discount: 51,
      imageUrl: require('../../assets/img/product_image/dog_food_5.jpg'),
    },
    {
      name: '강아지 사료 6',
      price: '89,987',
      recommended: 1, // Assuming only 1 out of 5 stars
      reviewCount: 120,
      discount: 78,
      imageUrl: require('../../assets/img/product_image/dog_food_6.jpg'),
    },
    {
      name: '강아지 사료 6',
      price: '89,987',
      recommended: 1, // Assuming only 1 out of 5 stars
      reviewCount: 120,
      discount: 8,
      imageUrl: require('../../assets/img/product_image/dog_food_6.jpg'),
    },
    {
      name: '강아지 사료 6',
      price: '89,987',
      recommended: 1, // Assuming only 1 out of 5 stars
      reviewCount: 120,
      discount: 3,
      imageUrl: require('../../assets/img/product_image/dog_food_6.jpg'),
    },
  ];

  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <Item
          key={index}
          name={item.name}
          price={item.price}
          discount={item.discount}
          recommended={item.recommended}
          reviewCount={item.reviewCount}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
};

export default ItemList;
