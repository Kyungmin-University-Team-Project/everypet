import React from 'react';
import styles from './Productcategory.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Productcategory = () => {
  return (
    <div className={styles.container}>
      <button className={styles.categorybar}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <div className={styles.category__menu}>
        {/* 나중에 컴포넌트로 따로 뺄지 고민 */}
        <Link to='/page2'>
          <button className={styles.category}>쿠폰/기획전</button>
        </Link>
        <Link to='/page3'>
          <button className={styles.category}>타임딜</button>
        </Link>
        <Link to='/page3'>
          <button className={styles.category}>강아지</button>
        </Link>
        <Link to='/page3'>
          <button className={styles.category}>고양이</button>
        </Link>
        <Link to='/page3'>
          <button className={styles.category}>설치류</button>
        </Link>

        <Link to='/page3'>
          <button className={styles.category}>조류</button>
        </Link>

        <Link to='/page3'>
          <button className={styles.category}>파충류</button>
        </Link>
      </div>
    </div>
  );
};

export default Productcategory;
