import React from 'react';
import styles from './HomeAd.module.css';

import ItemList from '../../components/common/ItemList';
import { FaChevronRight } from 'react-icons/fa6';

const HomeAd = ({ title, imageUrl }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <span className={styles.title}>{title}</span>
        <img
          className={styles.main__img}
          src={imageUrl}
          alt='main advertisement'
        />

        <div className={styles.rightAlign}>
          <span className={styles.view__all}>
            전체보기
            <FaChevronRight />
          </span>
        </div>
        <ItemList />
      </div>
    </div>
  );
};

export default HomeAd;
