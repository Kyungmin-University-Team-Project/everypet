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
          <span className={styles.tag}>마이페이지</span>
        </li>
        <li className={styles.order}>
          <LiaShippingFastSolid />
          <span className={styles.tag}>배송조회</span>
        </li>
        <li className={styles.cart}>
          <BsCart />
          <span className={styles.tag}>장바구니</span>
        </li>
      </ul>
    </div>
  );
};

export default Usermenu;
