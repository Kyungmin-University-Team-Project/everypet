import React from 'react';
import {Outlet, NavLink} from 'react-router-dom';
import styles from './MyPage.module.css';
import Header from "../../layout/Header/Header";
import Footer from "../../components/home/Footer";

const navItems = [
    { path: 'userInfo', label: '회원 정보' },
    { path: 'orderManagement', label: '배송조회' },
    { path: 'addressManagement', label: '배송지 관리' },
    { path: 'pointsAndCoupons', label: '포인트 및 쿠폰' },
    { path: 'inquiryHistory', label: '문의 내역' },
];

const MyPage = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            height: '100vh',
        }}>
                <Header/>
                <div className={styles.container}>
                    <div className={styles.sidebar}>
                        <span className={styles.title}>마이페이지</span>
                        <ul className={styles.sidebar__item__wrap}>
                            {navItems.map((item, index) => (
                                <li key={index} className={styles.sidebar__item}>
                                    <NavLink
                                        to={item.path}
                                        className={({isActive}) => isActive ? styles.active : ''}
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.mainContent}>
                        <Outlet/>
                    </div>
                </div>
            <Footer/>

        </div>
    );
};

export default MyPage;
