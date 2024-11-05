import React, { useState, useEffect } from 'react';
import styles from './UserInfo.module.css';
import axiosInstance from "../../../utils/error/axiosInstance";
import { handleAxiosError } from "../../../utils/error/errorHandler";
import { AxiosError } from "axios";
import LoadingSpinner from "../../../utils/reactQuery/LoadingSpinner";
import Footer from "../../../components/home/Footer";

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

const userInfoFields = (userInfo: UserInfoType) => [
    { label: '아이디', value: userInfo.memberId },
    { label: '이름', value: userInfo.name },
    { label: '비밀번호 변경', value:<button className={styles.button}>변경하기</button> },
    { label: '연락처', value: userInfo.phone },
    { label: '이메일', value: userInfo.email },
    { label: '회원등급', value: userInfo.level },
    { label: '포인트', value: `${userInfo.point} P` },
    { label: '가입일', value: new Date(userInfo.accRegisterDate).toLocaleDateString() },
    { label: '마지막 로그인', value: new Date(userInfo.lastLoginDate).toLocaleDateString() },
    { label: '마케팅 동의', value: userInfo.agreeMarketingYn === "Y" ? "동의함" : "동의하지 않음" }
];

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
        <div className={styles.container}>
            <span className={styles.title}>회원 정보</span>
            <div className={styles.gridContainer}>
                {userInfoFields(userInfo).map((item, index) => (
                    <div key={index} className={styles.infoItem}>
                        <div className={styles.label}>{item.label}</div>
                        <div className={styles.value}>{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserInfo;
