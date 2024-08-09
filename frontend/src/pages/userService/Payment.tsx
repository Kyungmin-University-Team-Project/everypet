import React from 'react';
import styles from './Payment.module.css';
import {Link} from "react-router-dom";

const Payment: React.FC = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Link to='/' className={styles.logo}>
                        에브리펫
                    </Link>
                </div>
            </header>

            <div className={styles.title}>
                <span>주문 결제</span>
            </div>

        </div>
    );
};

export default Payment;
