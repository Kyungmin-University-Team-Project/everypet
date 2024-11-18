import React, {useEffect} from 'react';
import styles from './TimeDeal.module.css';
import TimeItemList from '../../../components/timedeal/TimeItemList';

const TimeDeal = ({category}: any) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]); // Dependency array with 'category' to re-trigger when category changes

    // 무한 스크롤 기능 넣기

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.inner}>
                    {/* 아이템 리스트에 아이템 정보 넣기 */}
                    <span className={styles.title}>지금이 가장 쌉니다 타임딜!⏰</span>
                    <TimeItemList/>
                </div>
            </div>
        </div>
    );
};

export default TimeDeal;
