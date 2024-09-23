import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FaTrashAlt} from 'react-icons/fa';
import styles from './Cart.module.css';
import {CartItem, deleteCartItem, fetchCartItems} from '../../utils/product/cart';
import {handleAxiosError} from '../../utils/error/errorHandler';
import {AxiosError} from 'axios';

const shippingFee = 3000;

const Cart: React.FC = () => {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    const loadCartItems = async () => {
        try {
            const items: CartItem[] = await fetchCartItems();
            setCartItems(items);
            console.log(items)
            setSelectedItems(items.map((item: CartItem) => item.cartId));
            calculateTotalPrice(items, items.map((item: CartItem) => item.cartId));
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

    const formatPrice = (price: number) => {
        return price.toLocaleString() + '원';
    };

    const calculateTotalPrice = (items: CartItem[], selected: number[]) => {
        if (items && items.length > 0) {
            const selectedProductPrice = items
                .filter(item => selected.includes(item.cartId))
                .reduce((total, item) => {
                    const productPrice = item.price ?? 0;
                    return total + productPrice * item.cartQuantity;
                }, 0);
            const totalPrice = selectedProductPrice + (selectedProductPrice > 0 ? shippingFee : 0);
            setTotalPrice(totalPrice);
        }
    };

    const handleDeleteItem = async (cartId: number) => {
        try {
            await deleteCartItem(cartId);
            const newCartItems = cartItems.filter(item => item.cartId !== cartId);
            const newSelectedItems = selectedItems.filter(id => id !== cartId);
            setCartItems(newCartItems);
            setSelectedItems(newSelectedItems);
            calculateTotalPrice(newCartItems, newSelectedItems);
            setDeleteTrigger(true);
        } catch (error) {
            handleAxiosError(error as AxiosError);
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

    const handleItemSelectChange = (cartId: number) => {
        const newSelectedItems = selectedItems.includes(cartId)
            ? selectedItems.filter(id => id !== cartId)
            : [...selectedItems, cartId];
        setSelectedItems(newSelectedItems);
        calculateTotalPrice(cartItems, newSelectedItems);
    };

    const handleQuantityChange = (cartId: number, change: number) => {
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
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.cartId)}
                                    onChange={() => handleItemSelectChange(item.cartId)}
                                    className={styles.checkboxInput}
                                />
                                <FaTrashAlt
                                    className={styles.removeItemButton}
                                    onClick={() => handleDeleteItem(item.cartId)}
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
                                        >-
                                        </button>
                                        <input type="number" value={item.cartQuantity} readOnly
                                               className={styles.quantityInput}/>
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => handleQuantityChange(item.cartId, 1)}
                                        >+
                                        </button>
                                    </div>
                                    <div className={styles.total}>
                                        <p className={styles.price}>
                                            {item.price ? formatPrice(item.price * item.cartQuantity) : '0원'}
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
