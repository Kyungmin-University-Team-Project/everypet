import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        <Link to='/' className={styles.title}>
          <a>에브리펫</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
