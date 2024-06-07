import React from 'react';
import styles from './Footer.module.css';
import { FaGithub, FaEnvelope, FaUniversity } from 'react-icons/fa';

const Footer = () => {
  return (
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
        <span className={styles.footerText}>
          © 2024 EveryPet. All rights reserved.
        </span>
          <div className={styles.infoContainer}>
            <div className={styles.infoItem}>
              <FaUniversity className={styles.icon} />
              <span className={styles.infoText}>경민대학교</span>
            </div>
            <div className={styles.infoItem}>
              <FaEnvelope className={styles.icon} />
              <span className={styles.infoText}>gksktl111@naver.com</span>
            </div>
            <div className={styles.infoItem}>
              <FaGithub className={styles.icon} />
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
