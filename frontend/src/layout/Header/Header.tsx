import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Realtimekeyword from './Realtimekeyword';
import Cart from './Cart';
import Searchinput from './Searchinput';
import Orderview from './Orderview';

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        <Link to='/' className={styles.title}>
          에브리펫
        </Link>

        <Searchinput />

        <Realtimekeyword />

        <Link to='/login' className={styles.login__btn}>
          로그인
        </Link>

        <Cart />

        <Orderview />
      </div>
    </header>
  );
};

export default Header;
