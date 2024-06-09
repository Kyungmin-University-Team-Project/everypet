import React from 'react';
import { FaStar, FaRegStar, FaHeart, FaShoppingCart } from 'react-icons/fa';
import styles from './Item.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {decryptToken} from "../../utils/common/tokenDecode";

const Item = ({
                  productId,
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
        navigate('/moreInformation', { state: { item: { productId, name, price, discount, recommended, reviewCount, imageUrl } } });
    };

    const handleAddToCart = async (event: React.MouseEvent) => {
        event.stopPropagation(); // 이벤트 전파 중지
        try {
            const encryptedToken = localStorage.getItem('access');
            if (!encryptedToken) {
                throw new Error("No access token found");
            }

            const token = decryptToken(encryptedToken); // 유틸리티 함수 사용

            const response = await axios.post('/cart/add', {
                productId: productId,
                cartQuantity: 1
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'access': token
                }
            });

            console.log("장바구니 추가 성공:", response.data);
            alert("장바구니에 추가되었습니다.");
        } catch (error) {
            console.error("장바구니 추가 실패:", error);
            alert("장바구니에 추가하는데 실패했습니다.");
        }
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(i < recommended ? <FaStar key={i} /> : <FaRegStar key={i} />);
        }
        return stars;
    };

    return (
        <div className={styles.item} onClick={handleViewDetails} key={productId}> {/* key를 productId로 설정 */}
            <div className={styles.img__wrap}>
                <img className={styles.img} src={imageUrl} alt={name} />
            </div>
            <div className={styles.tagAndIcons}>
                <span className={styles.tag}>New</span>
                <div className={styles.icon__wrap}>
                    <FaShoppingCart className={styles.cartIcon} onClick={handleAddToCart} />
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
