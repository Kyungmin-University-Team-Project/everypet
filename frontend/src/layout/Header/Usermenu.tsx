import React from 'react';
import styles from './Usermenu.module.css';
import {Link} from 'react-router-dom';
import {AiOutlineUser, BsCart, LiaShippingFastSolid} from "../../icons/Icons";

const Usermenu = () => {

    return (
        <div className={styles.container}>
            <ul className={styles.user}>
                <li className={styles.user__li}>
                    <Link to="/myPage/userInfo" className={styles.link}>
                        <AiOutlineUser size={30}/>
                        <span className={styles.tag}>마이페이지</span>
                    </Link>
                </li>
                <li className={styles.user__li}>
                    <Link to="/myPage/orderManagement" className={styles.link}>
                        <LiaShippingFastSolid size={30}/>
                        <span className={styles.tag}>배송조회</span>
                    </Link>
                </li>
                <li className={styles.user__li}>
                    <Link to="/cart" className={styles.link}>
                        <BsCart size={30}/>
                        <span className={styles.tag}>장바구니</span>
                    </Link>
                </li>
            </ul>

        </div>
    );
};

export default Usermenu;
