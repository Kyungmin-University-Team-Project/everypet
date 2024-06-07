import React from 'react';
import styles from './ErrorComponent.module.css';

interface ErrorComponentProps {
    message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({message}) => {
    return (
        <div>
            <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>Error: {message}</p>
            </div>
        </div>
    );
};

export default ErrorComponent;
