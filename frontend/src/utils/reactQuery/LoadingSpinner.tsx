import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC = () => {
    return (
        <div>
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
