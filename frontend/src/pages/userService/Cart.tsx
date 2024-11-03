import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FaTrashAlt} from 'react-icons/fa';
import styles from './Cart.module.css';
import {deleteCartItem, fetchCartItems} from '../../utils/product/cart';
import {handleAxiosError} from '../../utils/error/errorHandler';
import {AxiosError} from 'axios';
import {formatPrice} from "../../utils/product/product";
import {CartItem} from "../../typings/product";
import {FaMinus, FaPlus} from "react-icons/fa6";
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";

const shippingFee = 3000;

const Cart: React.FC = () => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const loadCartItems = async () => {
        try {
            setIsLoading(false)

            const items: CartItem[] = await fetchCartItems();
            setCartItems(items);
            setSelectedItems(items.map((item: CartItem) => item.cartId));
            calculateTotalPrice(items, items.map((item: CartItem) => item.cartId));
        } catch (error) {
            handleAxiosError(error as AxiosError);

        }finally {
            setIsLoading(true)
        }
    };

    useEffect(() => {
        loadCartItems();
        console.log(cartItems)
    }, []);


    const calculateTotalPrice = (items: CartItem[], selected: string[]) => {
        if (items && items.length > 0) {
            const selectedProductPrice = items
                .filter(item => selected.includes(item.cartId))
                .reduce((total, item) => {
                    const productPrice = item.productPrice ?? 0;
                    const discountRate = item.productDiscountRate ? item.productDiscountRate / 100 : 0;
                    const discountedPrice = productPrice * (1 - discountRate);
                    return total + discountedPrice * item.cartQuantity;
                }, 0);

            const totalPrice = selectedProductPrice + (selectedProductPrice > 0 ? shippingFee : 0);
            setTotalPrice(totalPrice);
        }
    };

    const handleDeleteItem = async (productId: string) => {
        try {
            setIsLoading(false)
            await deleteCartItem(productId);
            const newCartItems = cartItems.filter(item => item.productId !== productId);
            const newSelectedItems = selectedItems.filter(id => id !== productId);
            setCartItems(newCartItems);
            setSelectedItems(newSelectedItems);
            calculateTotalPrice(newCartItems, newSelectedItems);
        } catch (error) {
            handleAxiosError(error as AxiosError);
        }finally {
            setIsLoading(true)
        }
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map(item => item.cartId));
        }
        setSelectAll(!selectAll);
        calculateTotalPrice(cartItems, selectAll ? [] : cartItems.map(item => item.cartId));
    };

    const handleItemSelectChange = (cartId: string) => {
        const newSelectedItems = selectedItems.includes(cartId)
            ? selectedItems.filter(id => id !== cartId)
            : [...selectedItems, cartId];
        setSelectedItems(newSelectedItems);
        calculateTotalPrice(cartItems, newSelectedItems);
    };

    const handleQuantityChange = (cartId: string, change: number) => {
        const item = cartItems.find(item => item.cartId === cartId);
        if (item) {
            const newQuantity = item.cartQuantity + change;
            if (newQuantity > 0) {
                const newCartItems = cartItems.map(item =>
                    item.cartId === cartId ? {...item, cartQuantity: newQuantity} : item
                );
                setCartItems(newCartItems);
                calculateTotalPrice(newCartItems, selectedItems);
            }
        }
    };

    const handleCheckout = () => {
        const selectedProducts = cartItems.filter(item => selectedItems.includes(item.cartId));
        navigate('/payment', {state: {selectedProducts, totalPrice}}); // 결제 페이지로 이동하면서 상태 전달
    };

    if (!isLoading) {
        return <LoadingSpinner/>
    }


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Link to='/' className={styles.title}>
                        에브리펫
                    </Link>
                </div>
            </header>
            <div className={styles.section}>
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
                        <div className={styles.item__wrap} key={item.cartId}>
                            <div className={styles.icon__btn}>
                                <FaTrashAlt
                                    className={styles.removeItemButton}
                                    onClick={() => handleDeleteItem(item.productId)}
                                />
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.cartId)}
                                    onChange={() => handleItemSelectChange(item.cartId)}
                                    className={styles.checkboxInput}
                                />
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemLeft}>
                                    <img
                                        src={item.productImg}
                                        alt={item.productName}
                                        className={styles.productImage}
                                    />
                                </div>
                                <div className={styles.product}>
                                    <div className={styles.productDetails}>
                                        <p>{item.productName}</p>
                                    </div>
                                    <div className={styles.quantity}>
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => handleQuantityChange(item.cartId, -1)}
                                        >
                                            <FaMinus/>
                                        </button>
                                        <input type="number" value={item.cartQuantity} readOnly
                                               className={styles.quantityInput}/>
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => handleQuantityChange(item.cartId, 1)}
                                        >
                                            <FaPlus/>
                                        </button>
                                    </div>
                                    <div className={styles.total}>
                                        <p className={styles.price}>
                                            {item.productDiscountRate
                                                ? formatPrice(Math.round((item.productPrice * item.cartQuantity) * (1 - item.productDiscountRate / 100)))
                                                : formatPrice(item.productPrice * item.cartQuantity)
                                            }
                                        </p>
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
                            <span>{formatPrice(shippingFee)}</span>
                        </div>

                        <div className={styles.summaryTotal}>
                            <span>합계:</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>

                        <button
                            className={styles.checkoutButton}
                            disabled={selectedItems.length === 0}
                            onClick={handleCheckout}
                        >주문하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
