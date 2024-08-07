import React, {useState} from 'react';
import styles from './MyPage.module.css';
import Header from "../../layout/Header/Header";
import Footer from "../../components/home/Footer";
import UserInfo from './mySubPage/UserInfo';
import OrderManagement from './mySubPage/OrderManagement';
import AddressManagement from "./mySubPage/AddressManagement";
import PointsAndCoupons from "./mySubPage/PointsAndCoupons";
import InquiryHistory from "./mySubPage/InquiryHistory";

const MyPage = () => {
    const [activeSection, setActiveSection] = useState('회원 정보');

    const renderSection = () => {
        switch (activeSection) {
            case '회원 정보':
                return <UserInfo/>;
            case '주문 관리':
                return <OrderManagement/>;
            case '배송지 관리':
                return <AddressManagement/>;
            case '포인트 및 쿠폰':
                return <PointsAndCoupons/>;
            case '문의 내역':
                return <InquiryHistory/>;
            default:
                return null;
        }
    };

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <span className={styles.title}>마이페이지</span>
                    <ul>
                        <li
                            className={`${styles.sidebar__item} ${activeSection === '회원 정보' ? styles.active : ''}`}
                            onClick={() => setActiveSection('회원 정보')}
                        >
                            <span>회원 정보</span>
                        </li>
                        <li
                            className={`${styles.sidebar__item} ${activeSection === '주문 관리' ? styles.active : ''}`}
                            onClick={() => setActiveSection('주문 관리')}
                        >
                            <span>주문 관리</span>
                        </li>
                        <li
                            className={`${styles.sidebar__item} ${activeSection === '배송지 관리' ? styles.active : ''}`}
                            onClick={() => setActiveSection('배송지 관리')}
                        >
                            <span>배송지 관리</span>
                        </li>
                        <li
                            className={`${styles.sidebar__item} ${activeSection === '포인트 및 쿠폰' ? styles.active : ''}`}
                            onClick={() => setActiveSection('포인트 및 쿠폰')}
                        >
                            <span>포인트 및 쿠폰</span>
                        </li>
                        <li
                            className={`${styles.sidebar__item} ${activeSection === '문의 내역' ? styles.active : ''}`}
                            onClick={() => setActiveSection('문의 내역')}
                        >
                            <span>문의 내역</span>
                        </li>
                    </ul>
                </div>

                <div className={styles.mainContent}>
                    {renderSection()}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default MyPage;
