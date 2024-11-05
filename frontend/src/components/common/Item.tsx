import React from 'react';
import styles from './Item.module.css';
import {useNavigate} from "react-router-dom";
import {addToCart} from "../../utils/product/cart";
import {handleViewDetails as handleViewDetailsUtil} from "../../utils/product/detailNavigation";
import {formatPrice} from "../../utils/product/product";
import {FaRegStar, FaShoppingCart, FaStar} from "../../icons/Icons";

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

    const discountedPrice = price - (price * (discount / 100));

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
        event.stopPropagation();
        addToCart(productId);
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(i < recommended ? <FaStar size={15} key={i}/> : <FaRegStar size={15} key={i}/>);
        }
        return stars;
    };

    return (
        <div className={styles.item} onClick={handleViewDetails}>
            <div className={styles.img__wrap}>
                <img className={styles.img} src={imageUrl} alt={name}/>
            </div>
            <div className={styles.tagAndIcons}>
                {/*
                tag 는 나중에 db에 옵션으로 넣어서 해당하는 카테고리를 넣어주도록 변경
                */}
                <span className={styles.tag}>New</span>
                <div className={styles.icon__wrap}>
                    <FaShoppingCart
                        className={styles.cartIcon} // CSS 모듈에서 정의된 클래스명 사용
                        onClick={handleAddToCart}
                    />
                </div>
            </div>
            <div className={styles.item__info}>
                <span className={styles.title}>{name}</span>
                <div className={styles.price__wrap}>
                    {discount > 0 && (
                        <>
                            <span className={styles.discount}>{discount}%</span>
                            <span className={styles.price}>{formatPrice(discountedPrice)}</span>
                        </>
                    )}
                    {discount === 0 && (
                        <span className={styles.price}>{formatPrice(price)}</span>
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
