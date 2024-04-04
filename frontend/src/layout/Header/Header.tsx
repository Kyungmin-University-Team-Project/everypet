import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Searchinput from './Searchinput';
import Usermenu from './Usermenu';

const Header = () => {
  return (
    <>
      <header className={styles.container}>
        <div className={styles.inner}>
          <Link to='/' className={styles.title}>
            에브리펫
          </Link>

          <Searchinput />

          <Usermenu />
        </div>
      </header>
    </>
  );
};

export default Header;
