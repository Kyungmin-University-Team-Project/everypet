import React, {useState, useEffect} from 'react';
import styles from './TimeItem.module.css';
import {useNavigate} from 'react-router-dom';
import {handleViewDetails as handleViewDetailsUtil} from '../../utils/product/detailNavigation';

interface Item {
    productId: string;
    timeLeft: number;
    imageUrl: string;
    price: number;
    discount: number;
    description: string;
    rating: number;
    reviewCount: number;
    details: string;
    coupon: string;
    couponDescription: string;
}

interface TimeItemProps {
    item: Item;
}

const TimeItem: React.FC<TimeItemProps> = ({item}) => {
    const [timeLeft, setTimeLeft] = useState<number>(item.timeLeft);
    const [seconds, setSeconds] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const formatTime = (seconds: number): string => {
            const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(
                2,
                '0'
            );
            const secs = String(seconds % 60).padStart(2, '0');
            return `${hours}:${minutes}:${secs}`;
        };

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime > 0 ? prevTime - 1 : 0;
                setSeconds(String(newTime % 60).padStart(2, '0'));
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatHoursMinutes = (seconds: number): string => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const calculateDiscountedPrice = (price: number, discount: number): number => {
        return Math.round(price * (1 - discount / 100));
    };

    const discountedPrice = calculateDiscountedPrice(item.price, item.discount);

    const handleViewDetails = () => {
        handleViewDetailsUtil(navigate, {
            productId: item.productId,
            name: item.description,
            price: item.price,
            discount: item.discount,
            recommended: item.rating,
            reviewCount: item.reviewCount,
            imageUrl: item.imageUrl
        });
    };

    return (
        <div className={styles.container} onClick={handleViewDetails}>
            <div className={styles.timeItem}>
                <div className={styles.image}>
                    <img src={item.imageUrl} alt='Product'/>
                </div>
                <div className={styles.info}>
                    <div className={styles.countdown}>
                        <div className={styles.tag}>타임딜</div>
                        <div className={styles.countdownText}>
                            {formatHoursMinutes(timeLeft)}:
                            <span className={styles.seconds}>{seconds}</span>
                        </div>
                    </div>
                    <div className={styles.description}>{item.description}</div>
                    <div className={styles.details}>
                        <div className={styles.price__container}>
                            <span className={styles.priceTitle}>{item.discount}%</span>
                            <div className={styles.price}>
                                <span className={styles.originalPrice}>{item.price}원</span>
                                <span className={styles.discountedPrice}>
                                    {discountedPrice}원
                                </span>
                            </div>
                        </div>
                        <p>{item.details}</p>
                        <div className={styles.coupon}>
                            <span>{item.coupon}</span>
                            <span> {item.couponDescription}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeItem;
