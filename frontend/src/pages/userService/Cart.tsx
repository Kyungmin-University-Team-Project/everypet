import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Cart.module.css';
import { Link } from "react-router-dom";
import { FaTrashAlt } from 'react-icons/fa';

interface CartItem {
    productId: string;
    productName: string;
    productPrice: string;
    cartQuantity: number;
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const shippingFee = 3000; // 배송비

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('access');

                console.log(token)

                const response = await axios.post('/cart/list', {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                // 에러 처리를 위해 사용자에게 알림 또는 다른 조치를 취할 수 있습니다.
            }
        };

        fetchCartItems();
    }, []);

    // 총 상품 금액 계산
    const productPrice = cartItems.reduce((total, item) => total + parseInt(item.productPrice.replace(/,/g, ''), 10) * item.cartQuantity, 0);
    const totalPrice = productPrice + shippingFee; // 총 금액

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Link to='/' className={styles.title}>
                        에브리펫
                    </Link>
                </div>
            </header>
            <div className={styles.container}>
                <div className={styles.cartItems}>
                    <div className={styles.cartHeader}>
                        <h2>장바구니</h2>
                        <span className={styles.selectAll}>전체 선택</span>
                    </div>
                    {cartItems.map((item) => (
                        <div className={styles.item__wrap} key={item.productId}>
                            <div className={styles.icon__btn}>
                                <input type="checkbox" className={styles.checkboxInput} />
                                <FaTrashAlt className={styles.removeItemButton} />
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemLeft}>
                                    <img
                                        src={`https://storage.googleapis.com/every_pet_img/${item.productId}`}
                                        alt={item.productName}
                                        className={styles.productImage}
                                    />
                                </div>
                                <div className={styles.product}>
                                    <div className={styles.productDetails}>
                                        <p>{item.productName}</p>
                                    </div>
                                    <div className={styles.quantity}>
                                        <button>-</button>
                                        <input type="number" value={item.cartQuantity} readOnly/>
                                        <button>+</button>
                                    </div>
                                    <div className={styles.total}>
                                        <p className={styles.price}>{item.productPrice}원</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.summaryContainer}>
                    <div className={styles.summary}>
                        <div className={styles.shippingFee}>
                            <span>예상 배송비:</span>
                            <span>₩{shippingFee.toLocaleString()}</span>
                        </div>
                        <div className={styles.summaryTotal}>
                            <span>합계:</span>
                            <span>{totalPrice.toLocaleString()}원</span>
                        </div>
                        <button className={styles.checkoutButton}>결제하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
