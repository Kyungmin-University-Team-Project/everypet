import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import styles from './PaymentSuccess.module.css';

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const ConfettiSpeed = 0.05;

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMainPageRedirect = () => {
        navigate('/');
    };

    return (
        <div className={styles.overlay}>
            <Confetti gravity={ConfettiSpeed} width={windowSize.width} height={windowSize.height} />
            <div className={styles.modal}>
                <div className={styles.title}>
                    <h2>결제 완료!</h2>
                    <h4>더 많은 상품을 구경해보시겠어요?</h4>
                </div>
                <button onClick={handleMainPageRedirect} className={styles.mainButton}>
                    메인으로
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
