import React from 'react';
import styles from './Usermenu.module.css';
import { BsCart } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';

const Usermenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Link to='/login'>로그인</Link>
        <Link to='/login'>회원가입</Link>
        <Link to='/login'>고객센터</Link>
      </div>
      <ul className={styles.user}>
        <li className={styles.my}>
          <AiOutlineUser />
        </li>
        <li className={styles.order}>
          <LiaShippingFastSolid />
        </li>
        <li className={styles.cart}>
          <BsCart />
        </li>
      </ul>
    </div>
  );
};

export default Usermenu;
