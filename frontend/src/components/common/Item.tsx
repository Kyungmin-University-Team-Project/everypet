import React from 'react';
import styles from './Item.module.css';

const Item = ({ name, price, recommended, reviewCount, imageUrl }: any) => {
  const handleViewDetails = (item: any) => {
    console.log(name, ': 해당상품 페이지로 이동');
  };

  return (
    <div className={styles.item} onClick={handleViewDetails}>
      <img className={styles.img} src={imageUrl} alt={name} />
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.price}>Price: ${price}</p>
      <p
        className={recommended ? styles.recommendation : styles.notRecommended}
      >
        {recommended ? 'Recommended' : 'Not Recommended'}
      </p>
      <p className={styles.reviewCount}>Reviews: {reviewCount}</p>
    </div>
  );
};

export default Item;
