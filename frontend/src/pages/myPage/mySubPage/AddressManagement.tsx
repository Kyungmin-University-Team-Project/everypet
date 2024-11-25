import React, { useEffect, useState } from 'react';
import styles from './AddressManagement.module.css';
import { API_URL } from "../../../api/api";
import axiosInstance from "../../../utils/error/axiosInstance";
import LoadingSpinner from "../../../utils/reactQuery/LoadingSpinner";
import DaumPostcodeEmbed from 'react-daum-postcode';
import {CheckIcon} from "../../../icons/Icons";
import {Address} from "../../../typings/myPage";



const AddressManagement = () => {
    const [addressList, setAddressList] = useState<Address[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null); // 수정 중인 주소
    const [newAddress, setNewAddress] = useState<Address>({
        address: '',
        addressId: 0,
        defaultYn: 'N',
        detailAddress: '',
        memberId: 'currentUserId',
        phone: '',
        receiver: '',
        request: '',
    });

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.post(`${API_URL}/address/list`);
                setAddressList(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('주소 데이터를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
        };
        fetchAddresses();
    }, []);

    // 주소 추가 처리
    const handleAddAddress = async () => {
        try {
            setLoading(true);
            await axiosInstance.post(`${API_URL}/address/register`, newAddress);
            setAddressList((prev) => [...prev, { ...newAddress, addressId: Date.now() }]);
            setIsModalOpen(false);
            setLoading(false);
        } catch (err) {
            console.error('주소 추가 실패:', err);
            setLoading(false);
        }
    };

    // 주소 수정 처리
    const handleUpdateAddress = async () => {
        if (!editingAddress) return;
        try {
            setLoading(true);
            await axiosInstance.post(`${API_URL}/address/update`, editingAddress);
            setAddressList((prev) =>
                prev.map((item) => (item.addressId === editingAddress.addressId ? editingAddress : item))
            );
            setIsModalOpen(false);
            setEditingAddress(null);
            setLoading(false);
        } catch (err) {
            console.error('주소 수정 실패:', err);
            setLoading(false);
        }
    };

    // 모달 닫기
    const handleModalClose = () => {
        setIsModalOpen(false);
        setIsPostcodeOpen(false);
        setEditingAddress(null); // 수정 모드 종료
    };

    // 주소 검색 완료
    const handleCompletePostcode = (data: any) => {
        if (editingAddress) {
            setEditingAddress((prev) => (prev ? { ...prev, address: data.address } : null));
        } else {
            setNewAddress((prev) => ({ ...prev, address: data.address }));
        }
        setIsPostcodeOpen(false);
    };

    // 주소 삭제 처리
    const handleDeleteAddress = async (addressId: number) => {
        try {
            setLoading(true); // 로딩 상태 활성화
            await axiosInstance.delete(`${API_URL}/address/delete`, {
                data: { addressId }, // DELETE 요청의 body로 addressId 전달
            });
            setAddressList((prev) => prev.filter((item) => item.addressId !== addressId)); // UI에서 삭제
            setLoading(false); // 로딩 상태 비활성화
        } catch (err) {
            console.error('주소 삭제 실패:', err);
            setLoading(false); // 로딩 상태 비활성화
        }
    };


    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <span className={styles.title}>배송지 관리</span>
                <div className={styles.buttonContainer}>
                    <button className={styles.button__add} onClick={() => setIsModalOpen(true)}>추가</button>
                </div>
            </div>
            <div className={styles.gridWrapper}>
                {addressList.map((item) => (
                    <div className={styles.addressCard} key={item.addressId}>
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
                        <div className={styles.addressField}>
                            <span className={styles.label}>기본 배송지:</span>
                            <span className={styles.value}>{item.defaultYn === 'Y' ? <CheckIcon size={20} className={styles.check__icon}/> : ''}</span>
                        </div>
                        <div className={styles.buttonGroup}>
                            <button
                                className={styles.button__edit}
                                onClick={() => {
                                    setEditingAddress(item);
                                    setIsModalOpen(true);
                                }}
                            >
                                수정하기
                            </button>
                            <button
                                className={styles.button__delete}
                                onClick={() => handleDeleteAddress(item.addressId)}
                            >
                                삭제하기
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <>
                    <div className={styles.modalOverlay} onClick={handleModalClose}></div>
                    <div className={styles.modal}>
                        <h2 className={styles.modalTitle}>{editingAddress ? '주소 수정' : '주소 추가'}</h2>
                        <div className={styles.modalContent}>
                            <input
                                type="text"
                                placeholder="주소"
                                value={editingAddress ? editingAddress.address : newAddress.address}
                                onClick={() => setIsPostcodeOpen(true)}
                                readOnly
                                className={styles.modalInput}
                            />
                            <input
                                type="text"
                                placeholder="상세 주소"
                                value={editingAddress ? editingAddress.detailAddress : newAddress.detailAddress}
                                onChange={(e) =>
                                    editingAddress
                                        ? setEditingAddress({ ...editingAddress, detailAddress: e.target.value })
                                        : setNewAddress({ ...newAddress, detailAddress: e.target.value })
                                }
                                className={styles.modalInput}
                            />
                            <input
                                type="text"
                                placeholder="받는 사람"
                                value={editingAddress ? editingAddress.receiver : newAddress.receiver}
                                onChange={(e) =>
                                    editingAddress
                                        ? setEditingAddress({ ...editingAddress, receiver: e.target.value })
                                        : setNewAddress({ ...newAddress, receiver: e.target.value })
                                }
                                className={styles.modalInput}
                            />
                            <input
                                type="text"
                                placeholder="연락처"
                                value={editingAddress ? editingAddress.phone : newAddress.phone}
                                onChange={(e) =>
                                    editingAddress
                                        ? setEditingAddress({ ...editingAddress, phone: e.target.value })
                                        : setNewAddress({ ...newAddress, phone: e.target.value })
                                }
                                className={styles.modalInput}
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={editingAddress ? editingAddress.defaultYn === 'Y' : newAddress.defaultYn === 'Y'}
                                    onChange={(e) =>
                                        editingAddress
                                            ? setEditingAddress({
                                                ...editingAddress,
                                                defaultYn: e.target.checked ? 'Y' : 'N',
                                            })
                                            : setNewAddress({
                                                ...newAddress,
                                                defaultYn: e.target.checked ? 'Y' : 'N',
                                            })
                                    }
                                />
                                기본 배송지로 설정
                            </label>
                        </div>
                        <div className={styles.modalActions}>
                            <button
                                className={styles.modalButton}
                                onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                            >
                                {editingAddress ? '수정' : '추가'}
                            </button>
                            <button className={styles.modalButtonClose} onClick={handleModalClose}>
                                닫기
                            </button>
                        </div>
                    </div>
                </>
            )}

            {isPostcodeOpen && (
                <div className={styles.postcodeWrapper}>
                    <DaumPostcodeEmbed
                        onComplete={handleCompletePostcode}
                        autoClose={false}
                    />
                </div>
            )}
        </div>
    );
};

export default AddressManagement;
