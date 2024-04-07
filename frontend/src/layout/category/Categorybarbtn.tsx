import React from 'react';
import styles from './Categorybarbtn.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';

const Categorybarbtn = ({ active = true, toggle }: any) => {
  // 기본값을 true로 설정
  return (
    <div className={styles.categorybar} onClick={toggle}>
      <RxHamburgerMenu size={28} />
      {active ? <span>전체상품</span> : ''}
    </div>
  );
};

export default Categorybarbtn;
