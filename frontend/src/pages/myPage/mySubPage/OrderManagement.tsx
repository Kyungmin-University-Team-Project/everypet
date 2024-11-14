import React, {useEffect, useState} from 'react';
import styles from './OrderManagement.module.css';
import axiosInstance from "../../../utils/error/axiosInstance";
import {API_URL} from "../../../api/api";

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
    const [orderList, setOrderList] = React.useState<OrderList[]>([]);
    const [list, setList] = useState(1);
    //  pageSize 고정
    const PAGE_SIZE = 5;
    // page가 몇 번째 페이지인지
    // pageSize 한 페이지에 몇 개씩 보여줄건지
    useEffect(() => {
        const orderList = async (page: number) => {
            try {
                const response = await axiosInstance.post(`${API_URL}/order/list/my`, {
                    page,
                    pageSize: PAGE_SIZE,
                })
                setOrderList(response.data);
                console.log(response.data, 'asdas');
            } catch (e) {
                console.error(e);
            }
        }
        orderList(list)
    }, [list]);

    const handleOnClickList = (event: React.MouseEvent<HTMLButtonElement>) => {
        setList(prev => prev + 1);
    }

    const handleOnClickListMinus = (event: React.MouseEvent<HTMLButtonElement>) => {
        setList(prev => {
            if (prev > 1) return prev - 1;
            return prev;
        })
    }
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h3>주문목록</h3>
                <input placeholder="주문한 상품을 검색할 수 있어요!" className={styles.searchBox}/>
            </div>
            <div className={styles.filterContainer}>
                <button className={styles.filterButton}>최근 6개월</button>
                <button className={styles.filterButton}>2024</button>
                <button className={styles.filterButton}>2023</button>
                <button className={styles.filterButton}>2020</button>
                <button className={styles.filterButton}>2019</button>
            </div>
            {orderList.length > 0 ? (
                orderList.map(order => (
                    <div key={order.orderId} className={styles.orderItem}>
                        <div className={styles.orderHeader}>
                            <h2 className={styles.orderDate}>{order.orderDate} 주문</h2>
                        </div>
                        <div className={styles.orderContent}>
                            <div className={styles.orderDetails}>
                                <div className={styles.productInfo}>
                                    <div>
                                        <img src={order.productImg} alt="product" className={styles.productImage}/>
                                    </div>
                                    <div>
                                        <p className={styles.productName}>{order.productName}</p>
                                        <p className={styles.price}>{order.totalAmount}원 - {order.quantity}</p>
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
                <p>123</p>
            )}
            <div className={styles.option_btn}>
                <button onClick={handleOnClickListMinus}>
                    이전
                </button>
                <button onClick={handleOnClickList}>
                    다음
                </button>
            </div>
        </section>
    );
};

export default OrderManagement;
