import React from 'react';
import {FaStar, FaRegStar, FaHeart, FaShoppingCart} from 'react-icons/fa';
import styles from './Item.module.css';
import {useNavigate} from "react-router-dom";

const Item = ({
                  name,
                  price,
                  discount,
                  recommended,
                  reviewCount,
                  imageUrl,
              }: any) => {
    const navigate = useNavigate();
    const handleViewDetails = () => {
        console.log(name, ': 해당상품 페이지로 이동');
        navigate('/moreInformation', {state: {item: {name, price, discount, recommended, reviewCount, imageUrl}}});
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(i < recommended ? <FaStar key={i}/> : <FaRegStar key={i}/>);
        }
        return stars;
    };

    return (
        <div className={styles.item} onClick={handleViewDetails}>
            <div className={styles.img__wrap}>
                <img className={styles.img} src={imageUrl} alt={name}/>

            </div>
            <div className={styles.tagAndIcons}>
                <span className={styles.tag}>New</span>
                <div className={styles.icon__wrap}>
                    <FaShoppingCart className={styles.cartIcon}/>
                    <FaHeart className={styles.likeIcon}/>
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