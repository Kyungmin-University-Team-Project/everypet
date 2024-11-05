import React, {useState} from 'react';
import styles from './PointsAndCoupons.module.css';
import ScrollToTopButton from "../../../components/common/ScrollToTopButton";

// 랜덤 포인트 및 쿠폰 데이터 생성
const generateRandomCoupons = () => {
    const coupons = [];
    const pointsOptions = ['5,000P', '10,000P', '15,000P', '20,000P', '25,000P'];
    const couponOptions = ['5% 할인 쿠폰', '10% 할인 쿠폰', '15% 할인 쿠폰', '20% 할인 쿠폰'];
    const sampleLinks = [
        'https://example.com/product1',
        'https://example.com/product2',
        'https://example.com/product3',
        'https://example.com/product4',
        'https://example.com/product5'
    ];

    for (let i = 0; i < 100; i++) { // 상품 개수 100개로 증가
        const randomPoints = pointsOptions[Math.floor(Math.random() * pointsOptions.length)];
        const randomCoupon = couponOptions[Math.floor(Math.random() * couponOptions.length)];
        const randomDate = new Date();
        randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 365)); // 랜덤으로 유효기간 설정
        const formattedDate = randomDate.toISOString().split('T')[0];
        const randomLink = sampleLinks[Math.floor(Math.random() * sampleLinks.length)];

        coupons.push({
            points: randomPoints,
            coupon: randomCoupon,
            expiryDate: formattedDate,
            link: randomLink,
            discount: parseInt(randomCoupon) // 할인 퍼센트 값을 숫자로 변환
        });
    }
    return coupons;
};

const PointsAndCoupons = () => {
    const [coupons, setCoupons] = useState(generateRandomCoupons());
    const [sortType, setSortType] = useState('latest');

    const sortCoupons = (type: string) => {
        const sortedCoupons = [...coupons];
        if (type === 'latest') {
            sortedCoupons.sort((a, b) => new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime());
        } else if (type === 'discount') {
            sortedCoupons.sort((a, b) => b.discount - a.discount);
        }
        setCoupons(sortedCoupons);
        setSortType(type);
    };

    const navigateProduct = (link: string) => {
        // api 연결후 링크 받아와서 검색진행
        console.log(link);
    };

    return (
        <div className={styles.section}>
            <span className={styles.title}>쿠폰</span>
            <div className={styles.header}>
                <span className={styles.couponCount}>총 {coupons.length}개</span>
                <div className={styles.sortButtons}>
                    <button
                        className={`${styles.sortButton} ${sortType === 'latest' ? styles.activeSort : ''}`}
                        onClick={() => sortCoupons('latest')}
                    >
                        최신순
                    </button>
                    <button
                        className={`${styles.sortButton} ${sortType === 'discount' ? styles.activeSort : ''}`}
                        onClick={() => sortCoupons('discount')}
                    >
                        할인순
                    </button>
                </div>
            </div>
            <div className={styles.gridWrapper}>
                {coupons.map((coupon, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.infoHeader}>
                            <span>{coupon.points}</span>
                        </div>
                        <div className={styles.couponDetails}>{coupon.coupon}</div>
                        <div className={styles.expiryDate}>{coupon.expiryDate}까지</div>
                        <div
                            className={styles.applyLink}
                            onClick={() => navigateProduct(coupon.link)}
                        >
                            적용상품
                        </div>
                    </div>
                ))}
            </div>

            <ScrollToTopButton/>
        </div>
    );
};

export default PointsAndCoupons;
