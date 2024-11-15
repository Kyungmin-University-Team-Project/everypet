import React, {useState} from 'react';
import classNames from 'classnames';
import styles from './InquiryHistory.module.css';
import {IoIosAdd} from "../../../icons/Icons";

const inquiries = [
    {
        id: '123456',
        title: '어쩌구 저쩌구 이게 상품이 이상하네 뭐네',
        date: '2024-07-15',
        status: '답변 완료',
        answer: '배송은 2~3일 내에 완료될 예정입니다배송은 2~3일 내에 완 예정입니다배송은 2~3일 내에 완 예정입니다배송은 2~3일 내에 완 예정입니다배송은 2~3일 내에 완 예정입니다배송은 2~3일 내에 완료될 예정입니다배송은 2~3일 내에 완료될 예정입니다.'
    },
    {id: '123457', title: '상품 문의', date: '2024-07-10', status: '처리중', answer: '상품 문의에 대한 답변은 현재 검토 중입니다.'},
    {id: '123458', title: '결제 문의', date: '2024-07-05', status: '답변 완료', answer: '결제는 정상적으로 처리되었습니다.'},
    {id: '123459', title: '반품 문의', date: '2024-07-01', status: '처리중', answer: '반품 요청이 접수되었으며 처리 중입니다.'},
];

const InquiryHistory = () => {
    const [activeInquiry, setActiveInquiry] = useState<string | null>(null);

    const handleIconClick = (id: string) => {
        setActiveInquiry((prev) => (prev === id ? null : id));
    };

    return (
        <div className={styles.section}>
            <span className={styles.title}>문의 내역</span>
            <div className={styles.gridContainer}>
                {inquiries.map((inquiry) => (
                    <div
                        key={inquiry.id}
                        className={styles.card}
                    >
                        <div className={styles.cardHeader}>
                            <span className={styles.inquiryId}>#{inquiry.id}</span>
                            <span
                                className={classNames(styles.status, {
                                    [styles.completed]: inquiry.status === '답변 완료',
                                    [styles.inProgress]: inquiry.status === '처리중',
                                })}
                            >
                                {inquiry.status}
                            </span>
                        </div>
                        <div className={styles.cardBody}>
                            <h3 className={styles.cardTitle}>{inquiry.title}</h3>
                            <p className={styles.date}>
                                작성 날짜: {inquiry.date}
                                <div
                                    className={classNames(styles.iconContainer, {
                                        [styles.iconContainer__active]: activeInquiry === inquiry.id,
                                    })}
                                    onClick={() => handleIconClick(inquiry.id)}
                                >
                                    <IoIosAdd />
                                </div>
                            </p>
                        </div>

                        {activeInquiry === inquiry.id && (
                            <div className={styles.answer}>
                                {inquiry.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InquiryHistory;
