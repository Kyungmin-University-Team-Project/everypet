import React from 'react';
import styles from './Footer.module.css';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span className={styles.footerText}>
          © 2024 EveryPet. All rights reserved.
        </span>
        <a
          href='https://github.com/Kyungmin-University-Team-Project/everypet'
          target='_blank'
          rel='noopener noreferrer'
          className={styles.githubLink}
        >
          <FaGithub /> Visit our GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
