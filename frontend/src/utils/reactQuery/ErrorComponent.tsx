import React from 'react';
import styles from './ErrorComponent.module.css';
import Header from "../../layout/Header/Header";

interface ErrorComponentProps {
    message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({message}) => {
    return (
        <div>
            <Header/>
            <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>Error: {message}</p>
            </div>
        </div>
    );
};

export default ErrorComponent;
