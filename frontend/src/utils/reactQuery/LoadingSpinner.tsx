import React from 'react';
import styles from './LoadingSpinner.module.css';
import Header from "../../layout/Header/Header";

const LoadingSpinner: React.FC = () => {
    return (
        <div>
            <Header/>
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
