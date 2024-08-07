import React from 'react';
import styles from './InquiryHistory.module.css';

const inquiries = [
    {id: '123456', title: '배송 문의', date: '2024-07-15', status: '답변 완료'},
    {id: '123457', title: '상품 문의', date: '2024-07-10', status: '처리 중'},
    {id: '123458', title: '결제 문의', date: '2024-07-05', status: '답변 완료'},
    {id: '123459', title: '반품 문의', date: '2024-07-01', status: '처리 중'},
];

const InquiryHistory = () => {
    return (
        <div className={styles.section}>
            <h2>문의 내역</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>문의 번호</th>
                    <th>제목</th>
                    <th>작성 날짜</th>
                    <th>상태</th>
                </tr>
                </thead>
                <tbody>
                {inquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                        <td>{inquiry.id}</td>
                        <td>{inquiry.title}</td>
                        <td>{inquiry.date}</td>
                        <td>{inquiry.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InquiryHistory;
