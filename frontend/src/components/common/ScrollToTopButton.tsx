import React, {useEffect, useState} from 'react';
import {FaArrowUp} from 'react-icons/fa';
import styles from './ScrollToTopButton.module.css';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const isScrollingUp = prevScrollPos > currentScrollPos;

        if (currentScrollPos > 300 && isScrollingUp) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }

        setPrevScrollPos(currentScrollPos);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <div className={styles.scrollToTop}>
            {isVisible &&
              <button
                onClick={scrollToTop}
                className={`${styles.scrollButton} ${isVisible ? styles.enter : ""}`}
              >
                <FaArrowUp className={styles.icon}/>
              </button>
            }
        </div>
    );
};

export default ScrollToTopButton;
