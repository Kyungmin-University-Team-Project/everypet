import React, {useState} from 'react';
import styles from './Usermenu.module.css';
import {BsCart} from 'react-icons/bs';
import {AiOutlineUser} from 'react-icons/ai';
import {LiaShippingFastSolid} from 'react-icons/lia';
import Cart from '../shopcart/Cart';
import {Link} from 'react-router-dom';
import DeliveryInquiry from "../../pages/userService/DeliveryInquiry";

const Usermenu = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className={styles.container}>
            <ul className={styles.user}>
                <li className={styles.user__li}>
                    <AiOutlineUser/>
                    <span className={styles.tag}>마이페이지</span>
                </li>
                <li className={styles.user__li}>
                    <Link to="/deliveryInquiry" className={styles.link}>
                        <LiaShippingFastSolid/>
                        <span className={styles.tag}>배송조회</span>
                    </Link>
                </li>
                <li className={styles.user__li} onClick={toggleCart}>
                    <BsCart/>
                    <span className={styles.tag}>장바구니</span>
                </li>
            </ul>
            <Cart isOpen={isCartOpen} onClose={toggleCart}/>
        </div>
    );
};

export default Usermenu;
