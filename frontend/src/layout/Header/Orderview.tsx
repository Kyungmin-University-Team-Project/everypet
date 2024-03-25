import React from 'react';
import styles from './Orderview.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
const Orderview = () => {
  // 주문조회 페이지로 이동

  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faTruckFast} className={styles.orderview__btn} />
    </div>
  );
};

export default Orderview;
