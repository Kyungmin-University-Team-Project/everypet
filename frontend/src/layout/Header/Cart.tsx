import React from 'react';
import styles from './Cart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faCartShopping} />
    </div>
  );
};

export default Cart;
