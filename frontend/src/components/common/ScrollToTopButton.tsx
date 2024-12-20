import React from 'react';
import styles from './ScrollToTopButton.module.css';
import useScrollPosition from "../../hooks/useScrollPosition";
import {FaArrowUp} from "../../icons/Icons";

const ScrollToTopButton: React.FC = () => {
    const isVisible = useScrollPosition(300);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    };

    return (
        <div className={styles.scrollToTop}>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className={`${styles.scrollButton} ${isVisible ? styles.enter : ""}`}
                >
                    <FaArrowUp size={30} className={styles.icon}/>
                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton;
