import React, {useState, useEffect} from "react";
import styles from "./UserInfo.module.css";
import axiosInstance from "../../../utils/error/axiosInstance";
import {handleAxiosError} from "../../../utils/error/errorHandler";
import {AxiosError} from "axios";
import LoadingSpinner from "../../../utils/reactQuery/LoadingSpinner";
import {API_URL} from "../../../api/api";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const loadUserInfo = async () => {
        try {
            const response = await axiosInstance.get<UserInfoType>(`${API_URL}/member/info`);
            setUserInfo(response.data);
        } catch (error) {
            handleAxiosError(error as AxiosError);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const payload = {
                oldPassword,
                newPassword,
            };

            await axiosInstance.post(`${API_URL}/member/password/change`, payload,);

            alert("비밀번호가 성공적으로 변경되었습니다.");
            closeModal();
        } catch (error) {
            handleAxiosError(error as AxiosError);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    useEffect(() => {
        loadUserInfo();
    }, []);

    const userInfoFields = (userInfo: UserInfoType) => [
        {label: "아이디", value: userInfo.memberId},
        {label: "이름", value: userInfo.name},
        {label: "비밀번호 변경", value: <button className={styles.button} onClick={openModal}>변경하기</button>},
        {label: "연락처", value: userInfo.phone},
        {label: "이메일", value: userInfo.email},
        {label: "회원등급", value: userInfo.level},
        {label: "포인트", value: `${userInfo.point} P`},
        {label: "가입일", value: new Date(userInfo.accRegisterDate).toLocaleDateString()},
        {label: "마지막 로그인", value: new Date(userInfo.lastLoginDate).toLocaleDateString()},
        {label: "마케팅 동의", value: userInfo.agreeMarketingYn === "Y" ? "동의함" : "동의하지 않음"},
    ];

    if (!userInfo) {
        return <LoadingSpinner/>;
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
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <span className={styles.title}>비밀번호 변경</span>
                        <div className={styles.input__wrap}>
                            <input
                                type="password"
                                placeholder="기존 비밀번호 입력"
                                className={styles.input}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="새 비밀번호 입력"
                                className={styles.input}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="새 비밀번호 확인"
                                className={styles.input}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.button__close} onClick={closeModal}>취소</button>
                            <button className={styles.button__save} onClick={handleChangePassword}>저장</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
