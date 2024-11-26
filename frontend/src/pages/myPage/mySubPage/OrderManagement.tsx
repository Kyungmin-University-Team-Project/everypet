import React, { useEffect, useState } from 'react';
import styles from './OrderManagement.module.css';
import axiosInstance from "../../../utils/error/axiosInstance";
import { API_URL } from "../../../api/api";
import {formatTime} from "../../../utils/common/formatTime";

interface OrderList {
    deliveryAmount: number;
    discountAmount: number;
    orderDate: string;
    orderDetailId: number;
    orderId: string;
    productAmount: number;
    productCategory: string;
    productId: string;
    productImg: string;
    productName: string;
    productPrice: number;
    quantity: number;
    reviewStatusYN: string;
    totalAmount: number;
}

const OrderManagement = () => {
    const [orderList, setOrderList] = useState<OrderList[]>([]);
    const [list, setList] = useState(1);

    const PAGE_SIZE = 5;

    useEffect(() => {
        const fetchOrderList = async (page: number) => {
            try {
                const response = await axiosInstance.post(`${API_URL}/order/list/my`, {
                    page,
                    pageSize: PAGE_SIZE,
                });
                setOrderList(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchOrderList(list);
    }, [list]);

    const handleOnClickList = () => {
        setList((prev) => prev + 1);
    };

    const handleOnClickListMinus = () => {
        setList((prev) => (prev > 1 ? prev - 1 : prev));
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <span className={styles.title}>주문목록</span>
                <input placeholder="주문한 상품을 검색할 수 있어요!" className={styles.searchBox} />
            </div>
            <div className={styles.filterContainer}>
                <button className={styles.filterButton}>최근 6개월</button>
                <button className={styles.filterButton}>2024</button>
                <button className={styles.filterButton}>2023</button>
                <button className={styles.filterButton}>2020</button>
                <button className={styles.filterButton}>2019</button>
            </div>
            {orderList.length > 0 ? (
                orderList.map((order) => (
                    <div key={order.orderId} className={styles.orderItem}>
                        <div className={styles.orderHeader}>
                            <h2 className={styles.orderDate}>{formatTime(order.orderDate)} 주문</h2>
                        </div>
                        <div className={styles.orderContent}>
                            <div className={styles.orderDetails}>
                                <div className={styles.productInfo}>
                                    <div>
                                        <img src={order.productImg} alt="product" className={styles.productImage} />
                                    </div>
                                    <div>
                                        <p className={styles.productName}>{order.productName}</p>
                                        <p className={styles.price}>
                                            {order.totalAmount}원 - {order.quantity}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.buttonGroup}>
                            <button className={styles.actionButton}>배송조회</button>
                            <button className={styles.actionButton}>교환, 반품 신청</button>
                            <button className={styles.actionButton}>리뷰 작성하기</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>주문 내역이 없습니다.</p>
            )}
            <div className={styles.option_btn}>
                <button onClick={handleOnClickListMinus}>이전</button>
                <button onClick={handleOnClickList}>다음</button>
            </div>
        </section>
    );
};

export default OrderManagement;
