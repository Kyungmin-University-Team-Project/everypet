import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FaTrashAlt} from 'react-icons/fa';
import styles from './Cart.module.css';
import {CartItem, deleteCartItem, fetchCartItems} from '../../utils/product/cart';
import {handleAxiosError} from '../../utils/error/errorHandler';
import {AxiosError} from 'axios';

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const shippingFee = 3000;

    const loadCartItems = async () => {
        try {
            const items: CartItem[] = await fetchCartItems();
            setCartItems(items);
            setSelectedItems(items.map((item: CartItem) => item.productId));
        } catch (error) {
            handleAxiosError(error as AxiosError);
        }
    };

    useEffect(() => {
        loadCartItems();
    }, []);

    useEffect(() => {
        if (deleteTrigger) {
            loadCartItems();
            setDeleteTrigger(false);
        }
    }, [deleteTrigger]);

    const handleDeleteItem = async (productId: string) => {
        try {
            await deleteCartItem(productId);
            setCartItems(cartItems.filter(item => item.productId !== productId));
            setSelectedItems(selectedItems.filter(id => id !== productId));
            setDeleteTrigger(true);
        } catch (error) {
            handleAxiosError(error as AxiosError);
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

    const handleQuantityChange = (productId: string, change: number) => {
        const item = cartItems.find(item => item.productId === productId);
        if (item) {
            const newQuantity = item.cartQuantity + change;
            if (newQuantity > 0) {
                setCartItems(cartItems.map(item =>
                    item.productId === productId ? {...item, cartQuantity: newQuantity} : item
                ));
            }
        }
    };

    const selectedProductPrice = cartItems
        .filter(item => selectedItems.includes(item.productId))
        .reduce((total, item) => total + parseInt(item.productPrice.replace(/,/g, ''), 10) * item.cartQuantity, 0);
    const totalPrice = selectedProductPrice + (selectedProductPrice > 0 ? shippingFee : 0);

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
                                    onClick={() => handleDeleteItem(item.productId)}
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
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => handleQuantityChange(item.productId, -1)}
                                        >-
                                        </button>
                                        <input type="number" value={item.cartQuantity} readOnly
                                               className={styles.quantityInput}/>
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => handleQuantityChange(item.productId, 1)}
                                        >+
                                        </button>
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
