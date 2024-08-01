import React from 'react';
import styles from './MyPage.module.css';
import Header from "../../layout/Header/Header";

const MyPage = () => {
    return (
        <>
            <Header/>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <span className={styles.title}>마이페이지</span>
                    <ul>
                        <li className={styles.sidebar__item}><span>회원 정보</span></li>
                        <li className={styles.sidebar__item}><span>주문 관리</span></li>
                        <li className={styles.sidebar__item}><span>배송지 관리</span></li>
                        <li className={styles.sidebar__item}><span>포인트 및 쿠폰</span></li>
                        <li className={styles.sidebar__item}><span>문의 내역</span></li>
                    </ul>
                </div>

                <div className={styles.mainContent}>
                    <div className={styles.section}>
                        <h2>회원 정보</h2>
                        <table className={styles.table}>
                            <tbody>
                            <tr>
                                <th>아이디</th>
                                <td>testUser1234</td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>박인규</td>
                            </tr>
                            <tr>
                                <th>비밀번호 변경</th>
                                <td>
                                    <button className={styles.button}>변경하기</button>
                                </td>
                            </tr>
                            <tr>
                                <th>연락처</th>
                                <td>010-1234-5678</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>test@example.com</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.section}>
                        <h2>주문 관리</h2>
                        <table className={styles.table}>
                            <tbody>
                            <tr>
                                <th>주문 번호</th>
                                <th>상품명</th>
                                <th>주문 날짜</th>
                                <th>상태</th>
                                <th>액션</th>
                            </tr>
                            <tr>
                                <td>123456</td>
                                <td>강아지 사료</td>
                                <td>2024-08-01</td>
                                <td>배송 중</td>
                                <td>
                                    <button className={styles.button}>주문 취소</button>
                                </td>
                            </tr>
                            {/* 추가 주문 항목 */}
                            </tbody>
                        </table>
                    </div>
                    {/* 추가 섹션 */}
                </div>
            </div>
        </>
    );
};

export default MyPage;
