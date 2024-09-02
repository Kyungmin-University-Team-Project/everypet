import React from 'react';
import styles from './UserInfo.module.css';

const UserInfo = () => {
    return (
        <div className={styles.section}>
            <h2>회원 정보</h2>
            <div className={styles.gridContainer}>
                <div className={styles.label}>아이디</div>
                <div className={styles.value}>testUser1234</div>

                <div className={styles.label}>이름</div>
                <div className={styles.value}>박민규</div>

                <div className={styles.label}>비밀번호 변경</div>
                <div className={styles.value}>
                    <button className={styles.button}>변경하기</button>
                </div>

                <div className={styles.label}>연락처</div>
                <div className={styles.value}>010-1234-5678</div>

                <div className={styles.label}>이메일</div>
                <div className={styles.value}>test@example.com</div>

                <div className={styles.label}>회원등급</div>
                <div className={styles.value}>씨앗🌱</div>

                <div className={styles.label}>포인트</div>
                <div className={styles.value}>14151248091785018 P</div>
            </div>
        </div>
    );
};

export default UserInfo;
