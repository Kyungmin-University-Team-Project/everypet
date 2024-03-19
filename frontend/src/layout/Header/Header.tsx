import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Searchinput from './searchinput/Searchinput';
import Realtimekeyword from './realtimekeyword/Realtimekeyword';

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        <Link to='/' className={styles.title}>
          <a>에브리펫</a>
        </Link>

        <Searchinput />

        <Realtimekeyword />

        <Link to='/login'>
          <button className={styles.login__btn}>로그인</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
