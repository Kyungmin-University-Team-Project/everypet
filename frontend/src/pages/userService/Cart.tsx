import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import CryptoJS from 'crypto-js';
import styles from './Cart.module.css';
import { Link } from "react-router-dom";
import { FaTrashAlt } from 'react-icons/fa';

interface CartItem {
    productId: string;
    productName: string;
    productPrice: string;
    cartQuantity: number;
}

const secretKey = "secret-key";

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false); // 삭제 이벤트 트리거
    const shippingFee = 3000; // 배송비

    const decryptToken = (encryptedToken: string, key: string): string => {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    const fetchCartItems = async () => {
        try {
            const encryptedToken = localStorage.getItem('access');
            if (!encryptedToken) {
                throw new Error("No access token found");
            }

            const token = decryptToken(encryptedToken, secretKey);
            console.log("Decrypted Access Token:", token);

            const response = await axios.post<CartItem[]>('/cart/list', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'access': token
                }
            });

            console.log("Response Data:", response.data);
            setCartItems(response.data);
            setSelectedItems(response.data.map(item => item.productId)); // 초기 항목 선택 설정
        } catch (error) {
            if (axios.isAxiosError(error)) {
                handleAxiosError(error);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        if (deleteTrigger) {
            fetchCartItems();
            setDeleteTrigger(false);
        }
    }, [deleteTrigger]);

    const handleAxiosError = (error: AxiosError) => {
        console.error('Error fetching cart items:', error);
        if (error.response) {
            console.error("Server Error:", error.response.data);
            console.error("Status Code:", error.response.status);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error setting up request:", error.message);
        }
    };

    const deleteItem = async (productId: string) => {
        try {
            const encryptedToken = localStorage.getItem('access');
            if (!encryptedToken) {
                throw new Error("No access token found");
            }

            const token = decryptToken(encryptedToken, secretKey);
            console.log("이게 아이디" + productId);

            const response = await axios.post('/cart/delete', { productId }, {
                headers: {
                    'Content-Type': 'application/json',
                    'access': token
                }
            });

            console.log("Delete response:", response.data);

            // 아이템 삭제 후 목록에서 직접 제거
            setCartItems(cartItems.filter(item => item.productId !== productId));
            setSelectedItems(selectedItems.filter(id => id !== productId));
            setDeleteTrigger(true); // 삭제 트리거 설정
        } catch (error) {
            console.error('Error deleting cart item:', error);
            if (axios.isAxiosError(error)) {
                handleAxiosError(error);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map(item => item.productId));
        }
        setSelectAll(!selectAll);
    };

    const handleItemSelectChange = (productId: string) => {
        if (selectedItems.includes(productId)) {
            setSelectedItems(selectedItems.filter(id => id !== productId));
        } else {
            setSelectedItems([...selectedItems, productId]);
        }
    };

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
                        <div className={styles.selectAll__wrap}>
                            <span className={styles.selectAll}>전체</span>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                                className={styles.check__all__Input}
                            />
                        </div>
                    </div>
                    {cartItems.map((item) => (
                        <div className={styles.item__wrap} key={item.productId}>
                            <div className={styles.icon__btn}>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.productId)}
                                    onChange={() => handleItemSelectChange(item.productId)}
                                    className={styles.checkboxInput}
                                />
                                <FaTrashAlt
                                    className={styles.removeItemButton}
                                    onClick={() => deleteItem(item.productId)}
                                />
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
                                        <button className={styles.quantityButton}>-</button>
                                        <input type="number" value={item.cartQuantity} readOnly className={styles.quantityInput}/>
                                        <button className={styles.quantityButton}>+</button>
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
                            <span>배송비:</span>
                            <span>{shippingFee.toLocaleString()}원</span>
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
