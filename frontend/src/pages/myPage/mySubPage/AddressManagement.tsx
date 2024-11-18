import React, { useEffect, useState } from 'react';
import styles from './AddressManagement.module.css';
import { API_URL } from "../../../api/api";
import axiosInstance from "../../../utils/error/axiosInstance";
import LoadingSpinner from "../../../utils/reactQuery/LoadingSpinner";

interface Address {
    address: string;
    detailAddress: string;
    addressId: number;
    defaultYn: string;
    memberId: string;
    phone: string;
    receiver: string;
    request: string;
}

const AddressManagement = () => {
    const [addressList, setAddressList] = useState<Address[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // 주소 리스트 가져오기
        const fetchAddresses = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.post(`${API_URL}/address/list`, {});
                setAddressList(response.data); // 서버에서 받은 데이터를 상태로 저장
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('주소 데이터를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.section}>
            <span className={styles.title}>배송지 관리</span>
            <div className={styles.gridWrapper}>
                {addressList.map((item, index) => (
                    <div className={styles.addressCard} key={index}>
                        <div className={styles.addressField}>
                            <span className={styles.label}>주소:</span>
                            <span className={styles.value}>{item.address}</span>
                        </div>
                        <div className={styles.addressField}>
                            <span className={styles.label}>상세 주소:</span>
                            <span className={styles.value}>{item.detailAddress}</span>
                        </div>
                        <div className={styles.addressField}>
                            <span className={styles.label}>받는 사람:</span>
                            <span className={styles.value}>{item.receiver}</span>
                        </div>
                        <div className={styles.addressField}>
                            <span className={styles.label}>연락처:</span>
                            <span className={styles.value}>{item.phone}</span>
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
