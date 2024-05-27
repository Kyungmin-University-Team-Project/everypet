import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TopMenu.module.css';

const TopMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Link to='/login'>로그인</Link>
        <Link to='/login/agreement'>회원가입</Link>
        <Link to='/customer-services'>고객센터</Link>
      </div>
    </div>
  );
};

export default TopMenu;
