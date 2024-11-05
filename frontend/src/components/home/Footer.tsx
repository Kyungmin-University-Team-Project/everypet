import React from 'react';
import styles from './Footer.module.css';
import {FaEnvelope, FaGithub, FaUniversity} from "../../icons/Icons";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
        <span className={styles.footerText}>
          © 2024 EveryPet. All rights reserved.
        </span>
                <div className={styles.infoContainer}>
                    <div className={styles.infoItem}>
                        <FaUniversity
                            size={25}
                            className={styles.icon}/>
                        <span className={styles.infoText}>경민대학교</span>
                    </div>
                    <div className={styles.infoItem}>
                        <FaEnvelope
                            size={25}
                            className={styles.icon}/>
                        <span className={styles.infoText}>gksktl111@naver.com</span>
                    </div>
                    <div className={styles.infoItem}>
                        <FaGithub
                            size={25}
                            className={styles.icon}/>
                        <a
                            href='https://github.com/Kyungmin-University-Team-Project/everypet'
                            target='_blank'
                            rel='noopener noreferrer'
                            className={styles.githubLink}
                        >
                            Visit our GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
