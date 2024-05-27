import React, { useState } from 'react';
import styles from './Cart.module.css';
import { AiOutlineClose } from 'react-icons/ai';

const Cart = ({ isOpen, onClose }: any) => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: '[유통기한임박] 바이탈랩반려견 케어 오리애니나스 340g exp24.07.07',
      price: 32000,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/60', // 이미지 URL 예시
    },
    {
      id: 2,
      name: '[유통기한임박] 액티백 애프터더치 리프 80g exp24.07.01',
      price: 30000,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/60', // 이미지 URL 예시
    },
    {
      id: 3,
      name: '[유통기한임박] now 그레인프리 어덜트 캣 연어 50g exp24.07.01',
      price: 24440,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/60', // 이미지 URL 예시
    },
  ]);

  const handleRemoveItem = (id: any) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={`${styles.cartContainer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.cartHeader}>
        <div className={styles.cartTitle}>장바구니</div>
        <div className={styles.cartClose} onClick={onClose}>
          <AiOutlineClose size={24} />
        </div>
      </div>
      <div className={styles.cartItems}>
        {items.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.imageUrl} alt={item.name} />
            <div className={styles.cartItemDetails}>
              <div>{item.name}</div>
              <div>{item.price}원</div>
            </div>
            <button
              className={styles.cartItemRemove}
              onClick={() => handleRemoveItem(item.id)}
            >
              삭 제
            </button>
          </div>
        ))}
      </div>
      <div className={styles.cartFooter}>
        <div className={styles.summary}>
          <span>상품금액</span>
          <span>{totalAmount}원</span>
        </div>
        <div className={styles.summary}>
          <span>배송비</span>
          <span>0원</span>
        </div>
        <div className={styles.totalAmount}>최종 결제금액: {totalAmount}원</div>
        <button className={styles.checkoutButton}>
          총 {items.length}개 {totalAmount}원 주문하기
        </button>
      </div>
    </div>
  );
};

export default Cart;
