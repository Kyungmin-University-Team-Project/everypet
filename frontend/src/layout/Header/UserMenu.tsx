import React from 'react';
import styles from './UserMenu.module.css';
import {Link} from 'react-router-dom';
import {AiOutlineUser, BsCart, LiaShippingFastSolid} from "../../icons/Icons";

const UserMenu = () => {

    return (
        <div className={styles.container}>
            <ul className={styles.user}>
                <li className={styles.user__li}>
                    <Link to="/myPage/userInfo">
                        <AiOutlineUser className={styles.icon} size={40}/>
                    </Link>
                </li>
                <li className={styles.user__li}>
                    <Link to="/myPage/orderManagement">
                        <LiaShippingFastSolid className={styles.icon} size={40}/>
                    </Link>
                </li>
                <li className={styles.user__li}>
                    <Link to="/cart">
                        <BsCart className={styles.icon} size={40}/>
                    </Link>
                </li>
            </ul>

        </div>
    );
};

export default UserMenu;
