import React from 'react';
import {FaHeart, FaRegStar, FaShoppingCart, FaStar} from 'react-icons/fa';
import styles from './Item.module.css';

const Item = ({
  name,
  price,
  discount,
  recommended,
  reviewCount,
  imageUrl,
}: any) => {
  const handleViewDetails = () => {
    console.log(name, ': 해당상품 페이지로 이동');
  };

  // Function to render stars based on recommendation
  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < recommended ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  return (
    <div className={styles.item} onClick={handleViewDetails}>
      <img className={styles.img} src={imageUrl} alt={name} />
      <div className={styles.tagAndIcons}>
        <span className={styles.tag}>New</span>
        <div>
          <FaShoppingCart className={styles.cartIcon} />
          <FaHeart className={styles.likeIcon} />
        </div>
      </div>

      <div className={styles.item__info}>
        <span className={styles.title}>{name}</span>

        <div className={styles.price__wrap}>
          <span className={styles.discount}>{discount}%</span>
          <span className={styles.price}>{price}원</span>
        </div>
        <div className={styles.recommendationAndReviews}>
          <div className={styles.stars}>{renderStars()}</div>
          <span className={styles.reviewCount}>({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

export default Item;
