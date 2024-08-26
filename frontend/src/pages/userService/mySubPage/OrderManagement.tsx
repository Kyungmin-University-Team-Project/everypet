import React from 'react';
import styles from './OrderManagement.module.css';

const orders = [
    {
        orderId: '123456',
        orderDate: '2024. 8. 23 주문',
        deliveryStatus: '배송완료',
        deliveryDate: '오늘(토) 도착 (문앞 전달)',
        productName: '홀리데이즈 관절건강 미국산 MSM2000, 120정, 1개',
        imageUrl: '/sam.jpg',
        price: '9,250 원',
        quantity: '1개'
    },
    {
        orderId: '654321',
        orderDate: '2024. 8. 22 주문',
        deliveryStatus: '배송완료',
        deliveryDate: '어제(금) 도착',
        productName: '삼대오백 에너지 통 흑마늘, 500g, 1개',
        imageUrl: '/sam.jpg',
        price: '19,900 원',
        quantity: '1개'
    }
];

const OrderManagement = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h3>주문목록</h3>
                <input placeholder="주문한 상품을 검색할 수 있어요!" className={styles.searchBox} />
            </div>
            <div className={styles.filterContainer}>
                <button className={styles.filterButton}>최근 6개월</button>
                <button className={styles.filterButton}>2024</button>
                <button className={styles.filterButton}>2023</button>
                <button className={styles.filterButton}>2020</button>
                <button className={styles.filterButton}>2019</button>
            </div>
            {orders.map(order => (
                <div key={order.orderId} className={styles.orderItem}>
                    <div className={styles.orderHeader}>
                        <h2 className={styles.orderDate}>{order.orderDate}</h2>
                    </div>
                    <div className={styles.orderContent}>
                        <div className={styles.orderDetails}>
                            <div className={styles.deliveryStatus}>
                                <span className={styles.deliveryStatusText}>{order.deliveryStatus}</span> · <span className={styles.deliveryDate}>{order.deliveryDate}</span>
                            </div>
                            <div className={styles.productInfo}>
                                <img src={order.imageUrl} alt="product" className={styles.productImage}/>
                                <div className={styles.productText}>
                                    <p className={styles.productName}>{order.productName}</p>
                                    <p className={styles.price}>{order.price} - {order.quantity}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.buttonGroup}>
                            <button className={styles.actionButton}>배송조회</button>
                            <button className={styles.actionButton}>교환, 반품 신청</button>
                            <button className={styles.actionButton}>리뷰 작성하기</button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default OrderManagement;
