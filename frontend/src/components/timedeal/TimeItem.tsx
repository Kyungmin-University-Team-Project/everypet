import React, {useState, useEffect} from 'react';
import styles from './TimeItem.module.css';

interface Item {
    timeLeft: number;
    image: string;
    discountedPrice: string;
    originalPrice: string;
    description: string;
    rating: number;
    reviews: string;
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

    return (
        <div className={styles.container}>
            <div className={styles.timeItem}>
                <div className={styles.image}>
                    <img src={item.image} alt='Product'/>
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
                            {/*할인율 변수화 하기*/}
                            <span className={styles.priceTitle}>20%</span>
                            <div className={styles.price}>
                                <span className={styles.originalPrice}>{item.originalPrice}원</span>
                                <span className={styles.discountedPrice}>
                                {item.discountedPrice}원
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
