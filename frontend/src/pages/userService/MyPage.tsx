import React from 'react';
import {Outlet, NavLink} from 'react-router-dom';
import styles from './MyPage.module.css';
import Header from "../../layout/Header/Header";
import Footer from "../../components/home/Footer";

const MyPage = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100vh',
        }}>
            <div>
                <Header/>
                <div className={styles.container}>
                    <div className={styles.sidebar}>
                        <span className={styles.title}>마이페이지</span>
                        <ul>
                            <li className={styles.sidebar__item}>
                                <NavLink
                                    to="userInfo"
                                    className={({isActive}) => isActive ? styles.active : ''}
                                >
                                    회원 정보
                                </NavLink>
                            </li>
                            <li className={styles.sidebar__item}>
                                <NavLink
                                    to="orderManagement"
                                    className={({isActive}) => isActive ? styles.active : ''}
                                >
                                    배송조회
                                </NavLink>
                            </li>
                            <li className={styles.sidebar__item}>
                                <NavLink
                                    to="addressManagement"
                                    className={({isActive}) => isActive ? styles.active : ''}
                                >
                                    배송지 관리
                                </NavLink>
                            </li>
                            <li className={styles.sidebar__item}>
                                <NavLink
                                    to="pointsAndCoupons"
                                    className={({isActive}) => isActive ? styles.active : ''}
                                >
                                    포인트 및 쿠폰
                                </NavLink>
                            </li>
                            <li className={styles.sidebar__item}>
                                <NavLink
                                    to="inquiryHistory"
                                    className={({isActive}) => isActive ? styles.active : ''}
                                >
                                    문의 내역
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.mainContent}>
                        <Outlet/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default MyPage;
