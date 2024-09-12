import React, { useState, useEffect } from 'react';
import styles from './UserInfo.module.css';
import axiosInstance from "../../../utils/error/axiosInstance";
import { handleAxiosError } from "../../../utils/error/errorHandler";
import { AxiosError } from "axios";
import LoadingSpinner from "../../../utils/reactQuery/LoadingSpinner";

// 인터페이스 정의
interface Authority {
    authority: string;
}

interface UserInfoType {
    accDeleteDate: string | null;
    accInactiveYn: string;
    accLoginCount: number;
    accRegisterDate: string;
    accUpdateDate: string;
    agreeMarketingYn: string;
    authorities: Authority[];
    email: string;
    lastLoginDate: string;
    level: string;
    loginFailCount: number;
    memberId: string;
    name: string;
    phone: string;
    point: number;
    tempPwdYn: string;
}

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

    const loadUserInfo = async () => {
        try {
            const response = await axiosInstance.get<UserInfoType>('/member/info');
            setUserInfo(response.data);
        } catch (error) {
            handleAxiosError(error as AxiosError);
        }
    };

    useEffect(() => {
        loadUserInfo();
    }, []);

    if (!userInfo) {
        return <LoadingSpinner/>
    }

    return (
        <div className={styles.section}>
            <h2>회원 정보</h2>
            <div className={styles.gridContainer}>
                <div className={styles.label}>아이디</div>
                <div className={styles.value}>{userInfo.memberId}</div>

                <div className={styles.label}>이름</div>
                <div className={styles.value}>{userInfo.name}</div>

                <div className={styles.label}>비밀번호 변경</div>
                <div className={styles.value}>
                    <button className={styles.button}>변경하기</button>
                </div>

                <div className={styles.label}>연락처</div>
                <div className={styles.value}>{userInfo.phone}</div>

                <div className={styles.label}>이메일</div>
                <div className={styles.value}>{userInfo.email}</div>

                <div className={styles.label}>회원등급</div>
                <div className={styles.value}>{userInfo.level}</div>

                <div className={styles.label}>포인트</div>
                <div className={styles.value}>{userInfo.point} P</div>

                <div className={styles.label}>가입일</div>
                <div className={styles.value}>{new Date(userInfo.accRegisterDate).toLocaleDateString()}</div>

                <div className={styles.label}>마지막 로그인</div>
                <div className={styles.value}>{new Date(userInfo.lastLoginDate).toLocaleDateString()}</div>

                <div className={styles.label}>마케팅 동의</div>
                <div className={styles.value}>{userInfo.agreeMarketingYn === "Y" ? "동의함" : "동의하지 않음"}</div>
            </div>
        </div>
    );
};

export default UserInfo;
