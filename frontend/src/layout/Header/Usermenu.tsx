import React from 'react';
import styles from './Usermenu.module.css';
import {BsCart} from 'react-icons/bs';
import {AiOutlineUser} from 'react-icons/ai';
import {LiaShippingFastSolid} from 'react-icons/lia';
import {Link} from 'react-router-dom';

const Usermenu = () => {

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
                <li className={styles.user__li}>
                    <Link to="/cart" className={styles.link}>
                        <BsCart/>
                        <span className={styles.tag}>장바구니</span>
                    </Link>
                </li>
            </ul>

        </div>
    );
};

export default Usermenu;
