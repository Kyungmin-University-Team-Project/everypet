import React from 'react';
import styles from './OrderManagement.module.css';

const orders = [
    {orderId: '123456', productName: '강아지 사료', orderDate: '2024-08-01', status: '배송 중'},
    {orderId: '654321', productName: '고양이 장난감', orderDate: '2024-07-25', status: '배송 완료'},
    {orderId: '789012', productName: '새장 청소도구', orderDate: '2024-07-20', status: '배송 중'},
    {orderId: '210987', productName: '파충류 히터', orderDate: '2024-07-15', status: '배송 대기'},
    {orderId: '345678', productName: '어류 수조', orderDate: '2024-07-10', status: '배송 중'},
];

const OrderManagement = () => {
    return (
        <div className={styles.section}>
            <h2>주문 관리</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>주문 번호</th>
                    <th>상품명</th>
                    <th>주문 날짜</th>
                    <th>상태</th>
                    <th>액션</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.productName}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.status}</td>
                        <td>
                            <button className={styles.button}>주문 취소</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManagement;
