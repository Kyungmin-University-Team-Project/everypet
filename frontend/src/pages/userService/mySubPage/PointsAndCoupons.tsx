import React from 'react';
import styles from './PointsAndCoupons.module.css';

const coupons = [
    {points: '10,000P', coupon: '10% 할인 쿠폰', expiryDate: '2024-12-31'},
    {points: '20,000P', coupon: '15% 할인 쿠폰', expiryDate: '2024-11-30'},
    {points: '30,000P', coupon: '20% 할인 쿠폰', expiryDate: '2024-10-31'},
];

const PointsAndCoupons = () => {
    return (
        <div className={styles.section}>
            <h2 className={styles.h2}>포인트 및 쿠폰</h2>

            <div className={styles.tableWrapper}>
                {coupons.map((coupon, index) => (
                    <div key={index} className={styles.tableContainer}>
                        <table className={styles.table}>
                            <tbody>
                            <tr>
                                <th>포인트</th>
                                <td>{coupon.points}</td>
                            </tr>
                            <tr>
                                <th>쿠폰</th>
                                <td>{coupon.coupon}</td>
                            </tr>
                            <tr>
                                <th>유효기간</th>
                                <td>{coupon.expiryDate}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PointsAndCoupons;
