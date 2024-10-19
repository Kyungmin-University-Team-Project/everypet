import React from 'react';
import styles from './LoadingSpinner.module.css';
import {ClipLoader, SyncLoader} from "react-spinners";

const LoadingSpinner: React.FC = () => {
    return (
        <div>
            <div className={styles.spinnerContainer}>
                <ClipLoader size={100} color="#0080FF"/>
            </div>
        </div>
    );
};

export default LoadingSpinner;
