import React, {useEffect} from 'react';
import styles from './TimeDeal.module.css';
import Header from '../../layout/Header/Header';
import Fixedheader from '../../layout/Header/Fixedheader';
import Productcategory from '../../layout/category/Productcategory';
import TimeItem from '../../components/timedeal/TimeItem';
import TimeItemList from '../../components/timedeal/TimeItemList';
import Footer from '../../components/home/Footer';

const TimeDeal = ({category}: any) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]); // Dependency array with 'category' to re-trigger when category changes

    // 무한 스크롤 기능 넣기

    return (
        <div>
            <Fixedheader/>
            <Header/>
            <Productcategory/>

            <div className={styles.container}>
                <div className={styles.inner}>
                    {/* 아이템 리스트에 아이템 정보 넣기 */}
                    <span className={styles.title}>지금 당장 구매하세요 안사면 후회하는 가격!</span>
                    <TimeItemList/>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default TimeDeal;
