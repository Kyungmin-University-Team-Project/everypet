import React from 'react';
import styles from './AddressManagement.module.css';

const addresses = [
    {
        address: "서울특별시 강남구 테헤란로 123",
        detailAddress: "XX아파트 303동 301호",
    },
    {
        address: "서울특별시 종로구 종로 456",
        detailAddress: "OO아파트 1203동 1201호",
    },
    {
        address: "경기도 성남시 분당구 정자일로 789",
        detailAddress: "MM아파트 101동 101호",
    },
    {
        address: "서울특별시 강남구 테헤란로 123",
        detailAddress: "XX아파트 303동 301호",
    },
    {
        address: "서울특별시 종로구 종로 456",
        detailAddress: "OO아파트 1203동 1201호",
    },
    {
        address: "경기도 성남시 분당구 정자일로 789",
        detailAddress: "MM아파트 101동 101호",
    },
    {
        address: "서울특별시 강남구 테헤란로 123",
        detailAddress: "XX아파트 303동 301호",
    },
    {
        address: "서울특별시 종로구 종로 456",
        detailAddress: "OO아파트 1203동 1201호",
    },

];

const AddressManagement = () => {
    return (
        <div className={styles.section}>
            <span className={styles.title}>배송지 관리</span>
            <div className={styles.gridWrapper}>
                {addresses.map((item, index) => (
                    <div className={styles.addressCard} key={index}>
                        <div className={styles.addressField}>
                            <span className={styles.label}>주소:</span>
                            <span className={styles.value}>{item.address}</span>
                        </div>
                        <div className={styles.addressField}>
                            <span className={styles.label}>상세 주소:</span>
                            <span className={styles.value}>{item.detailAddress}</span>
                        </div>
                        <div className={styles.buttonGroup}>
                            <button className={styles.button__edit}>수정하기</button>
                            <button className={styles.button__delete}>삭제하기</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressManagement;
