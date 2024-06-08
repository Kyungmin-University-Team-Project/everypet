import React, { useEffect } from 'react';
import styles from './Cupon.module.css';

import ItemList from '../../components/common/ItemList';

const Cupon = ({ category }: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]); // Dependency array with 'category' to re-trigger when category changes

  // 무한 스크롤 기능 넣기

  return (
    <div>


      <div className={styles.container}>
        <div className={styles.inner}>
          <ItemList />
        </div>
      </div>
    </div>
  );
};

export default Cupon;
