import React from 'react';
import styles from './AddressManagement.module.css';

const addresses = [
    {
        address: "서울특별시 강남구 테헤란로 123",
        postalCode: "123-456",
    },
    {
        address: "서울특별시 종로구 종로 456",
        postalCode: "456-789",
    },
    {
        address: "경기도 성남시 분당구 정자일로 789",
        postalCode: "789-012",
    },
];

const AddressManagement = () => {
    return (
        <div className={styles.section}>
            <h2>배송지 관리</h2>
            <div className={styles.tableWrapper}>
                {addresses.map((item, index) => (
                    <div className={styles.tableContainer} key={index}>
                        <table className={styles.table}>
                            <tbody>
                            <tr>
                                <th>주소</th>
                                <td>{item.address}</td>
                            </tr>
                            <tr>
                                <th>우편번호</th>
                                <td>{item.postalCode}</td>
                            </tr>
                            <tr>
                                <th>수정</th>
                                <td>
                                    <button className={styles.button}>수정하기</button>
                                </td>
                            </tr>
                            <tr>
                                <th>삭제</th>
                                <td>
                                    <button className={styles.button}>삭제하기</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressManagement;
