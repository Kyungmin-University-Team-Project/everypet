import React from 'react';
import Item from './Item';
import styles from './ItemList.module.css';

const ItemList = () => {
  // Example items data
  const items = [
    {
      name: '강아지 사료 1',
      price: '99.99',
      recommended: true,
      reviewCount: 150,
      imageUrl: require('../../assets/img/product_image/dog_food_1.jpg'),
    },
    {
      name: '강아지 사료 2',
      price: '249.50',
      recommended: false,
      reviewCount: 85,
      imageUrl: require('../../assets/img/product_image/dog_food_2.jpg'),
    },
    {
      name: '강아지 사료 3',
      price: '129.99',
      recommended: true,
      reviewCount: 200,
      imageUrl: require('../../assets/img/product_image/dog_food_3.jpg'),
    },
    {
      name: '강아지 사료 4',
      price: '199.99',
      recommended: true,
      reviewCount: 300,
      imageUrl: require('../../assets/img/product_image/dog_food_4.jpg'),
    },
    {
      name: '강아지 사료 5',
      price: '49.99',
      recommended: true,
      reviewCount: 100,
      imageUrl: require('../../assets/img/product_image/dog_food_5.jpg'),
    },
    {
      name: '강아지 사료 6',
      price: '299.99',
      recommended: false,
      reviewCount: 120,
      imageUrl: require('../../assets/img/product_image/dog_food_6.jpg'),
    },
    {
      name: '강아지 사료 5',
      price: '49.99',
      recommended: true,
      reviewCount: 100,
      imageUrl: require('../../assets/img/product_image/dog_food_5.jpg'),
    },
    {
      name: '강아지 사료 6',
      price: '299.99',
      recommended: false,
      reviewCount: 120,
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
          recommended={item.recommended}
          reviewCount={item.reviewCount}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
};

export default ItemList;
