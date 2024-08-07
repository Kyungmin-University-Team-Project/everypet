import React from 'react';
import styles from './UserInfo.module.css';

const UserInfo = () => {
    return (
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
                    <td>박민규</td>
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
    );
};

export default UserInfo;
