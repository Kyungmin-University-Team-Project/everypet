import React from 'react';
import styles from './Categorybarbtn.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';

const Categorybarbtn = ({ active = true, isOpen, setOpen, setClose }: any) => {
  const handleClick = () => {
    if (isOpen) {
      setClose();
    } else {
      setOpen();
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
