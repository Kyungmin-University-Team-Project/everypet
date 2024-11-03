import React from 'react';
import styles from './ScrollToTopButton.module.css';
import { FaArrowUp } from 'react-icons/fa';
import useScrollPosition from "../../hooks/useScrollPosition";

const ScrollToTopButton: React.FC = () => {
    const isVisible = useScrollPosition(300); // 300px 이상 스크롤 시 버튼 표시

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={styles.scrollToTop}>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className={`${styles.scrollButton} ${isVisible ? styles.enter : ""}`}
                >
                    <FaArrowUp className={styles.icon}/>
                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton;
