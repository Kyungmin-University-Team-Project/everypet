import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Searchinput from './Searchinput';
import Realtimekeyword from './Realtimekeyword';
import Cart from './Cart';

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        <Link to='/' className={styles.title}>
          <a>에브리펫</a>
        </Link>

        <Searchinput />

        <Realtimekeyword />

        <Link to='/login' className={styles.login__btn}>
          <a>로그인</a>
        </Link>

        <Cart />
      </div>
    </header>
  );
};

export default Header;
