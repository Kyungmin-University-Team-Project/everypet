import React from 'react';
import { FaRegStar, FaShoppingCart, FaStar } from 'react-icons/fa';
import styles from './Item.module.css';
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../utils/product/cart";
import { handleViewDetails as handleViewDetailsUtil } from "../../utils/product/detailNavigation";

interface ItemProps {
    productId: string;
    name: string;
    price: number;
    discount: number;
    recommended: number;
    reviewCount: number;
    imageUrl: string;
}

const Item: React.FC<ItemProps> = ({
                                       productId,
                                       name,
                                       price,
                                       discount,
                                       recommended,
                                       reviewCount,
                                       imageUrl,
                                   }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        handleViewDetailsUtil(navigate, {
            productId,
            name,
            price,
            discount,
            recommended,
            reviewCount,
            imageUrl
        });
    };

    const handleAddToCart = (event: React.MouseEvent) => {
        event.stopPropagation(); // 이벤트 전파 중지
        addToCart(productId);
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(i < recommended ? <FaStar key={i} /> : <FaRegStar key={i} />);
        }
        return stars;
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const discountedPrice = price - (price * (discount / 100));

    return (
        <div className={styles.item} onClick={handleViewDetails}>
            <div className={styles.img__wrap}>
                <img className={styles.img} src={imageUrl} alt={name} />
            </div>
            <div className={styles.tagAndIcons}>
                <span className={styles.tag}>New</span>
                <div className={styles.icon__wrap}>
                    <FaShoppingCart className={styles.cartIcon} onClick={handleAddToCart} />
                </div>
            </div>
            <div className={styles.item__info}>
                <span className={styles.title}>{name}</span>
                <div className={styles.price__wrap}>
                    {discount > 0 && (
                        <>
                            <span className={styles.discount}>{discount}%</span>
                            <span className={styles.price}>{formatPrice(discountedPrice)}원</span>
                        </>
                    )}
                    {discount === 0 && (
                        <span className={styles.price}>{formatPrice(price)}원</span>
                    )}
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
