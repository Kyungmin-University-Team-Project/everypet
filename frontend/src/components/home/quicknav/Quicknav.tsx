import React from 'react';
import styles from './Quicknav.module.css';

// 서버에서 데이터 받아와서 바꾸기
// 클라이언트의

const categories = [
  '카테고리1',
  '카테고리2',
  '카테고리3',
  '카테고리4',
  '카테고리5',
  '카테고리6',
  '카테고리7',
];

const Quicknav = () => {
  return (
    <div className={styles.quick__nav__container}>
      <nav className={styles.quick__nav}>
        {categories.map((category, index) => (
          <div key={index}>
            <div className={styles.quick__nav__item}></div>
            <span>{category}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Quicknav;
