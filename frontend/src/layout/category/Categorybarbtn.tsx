import React from 'react';
import styles from './Categorybarbtn.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';

const Categorybarbtn = ({ active = true, isOpen, setOpen, setClose }: any) => {
  const handleClick = () => {
    if (isOpen) {
      setClose(); // isOpen이 true일 때 닫기
    } else {
      setOpen(); // isOpen이 false일 때 열기
    }
  };

  return (
    <div className={styles.categorybar} onClick={handleClick}>
      <RxHamburgerMenu size={28} />
      {active ? <span>전체상품</span> : ''}
    </div>
  );
};

export default Categorybarbtn;
