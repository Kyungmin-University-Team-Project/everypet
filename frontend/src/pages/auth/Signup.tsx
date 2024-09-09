import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Postcode from "./Postcode";
import styles from "./Signup.module.css";
import { signUpLogin, sendVerificationEmail, verifyCode } from "../../typings/AuthAPI";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
import { Join } from "../../typings/signup";

const Signup: React.FC = () => {
    const location = useLocation();
    const agreeMarketingYn = location.state?.agreeMarketingYn || "N";
    const navigate = useNavigate();

    const [user, setUser] = useState<Join>({
        memberId: "",
        memberPwd: "",
        email: "",
        name: "",
        birth: "",
        phone: "",
        referrer: "",
        address: {
            address: "",
            detailAddress: ""
        },
        agreeMarketingYn: agreeMarketingYn,
    });

    const [disableButton, setDisableButton] = useState(true);
    const [emailSent, setEmailSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("Sending user data:", JSON.stringify(user, null, 2));

            const response = await signUpLogin(user);

            console.log("Server response:", response);
            if (response.success) {
                navigate('/'); // 가입 성공 후 리다이렉션
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log("Error response data:", error.response.data);
                console.log("Error response status:", error.response.status);
                console.log("Error response headers:", error.response.headers);
            } else {
                console.log("Error during signup:", error);
            }
        }
    };

    const hi = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.trim();

        if (!inputValue || user.memberId.length < 5 || user.memberPwd.length < 5) {
            e.target.placeholder = "아이디를 5글자 이상 입력해주세요.";
            e.target.style.border = "1px solid rgb(231, 62, 62)";
            setDisableButton(true);
        } else {
            setDisableButton(false);
            e.target.style.border = "1px solid #888";
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "address" || name === "detailAddress") {
            setUser((prevUser) => ({
                ...prevUser,
                address: {
                    ...prevUser.address,
                    [name]: value
                }
            }));
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const handleAddressChange = (address: string, detailAddress: string) => {
        setUser({ ...user, address: { address, detailAddress } });
    };

    const handleSendVerificationEmail = async () => {
        try {
            const response = await sendVerificationEmail({ email: user.email });
            console.log("Verification email sent:", response);
            setEmailSent(true); // Set state to indicate email has been sent
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log("Error response data:", error.response.data);
                console.log("Error response status:", error.response.status);
                console.log("Error response headers:", error.response.headers);
            } else {
                console.log("Error sending verification email:", error);
            }
        }
    };

    const [verificationCode, setVerificationCode] = useState("");

    const handleVerifyCode = async () => {
        try {
            const response = await verifyCode({ email: user.email, code: verificationCode });
            console.log("Verification successful:", response);
            setEmailVerified(true); // Set state to indicate email verification successful
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log("Error response data:", error.response.data);
                console.log("Error response status:", error.response.status);
                console.log("Error response headers:", error.response.headers);
            } else {
                console.log("Error verifying code:", error);
            }
        }
    };

    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <h3>
                에브리펫 아이디로 반려동물 쇼핑 끝!
            </h3>
            <label htmlFor="memberId" className={styles.label_container}>
                <input
                    value={user.memberId}
                    name="memberId"
                    id="memberId"
                    onChange={handleChange}
                    placeholder="아이디"
                    className={styles.input_value}
                    onBlur={hi}
                    required
                />
            </label>
            <label htmlFor="memberPwd" className={styles.label_container}>
                <input
                    type="password"
                    value={user.memberPwd}
                    name="memberPwd"
                    id="memberPwd"
                    onChange={handleChange}
                    placeholder="비밀번호"
                    className={styles.input_value}
                    onBlur={hi}
                    required
                />
            </label>

            <label className={styles.label_container} htmlFor="email">
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="이메일"
                    className={styles.input_value}
                    value={user.email}
                    onChange={handleChange}
                    required
                />
                <button
                    type="button"
                    onClick={handleSendVerificationEmail}
                    className={styles.verify_btn}
                    disabled={!user.email || emailSent}
                >
                    {emailSent ? "인증 이메일 전송됨" : "이메일 인증"}
                </button>
                {emailSent && (
                    <>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="인증 코드"
                            className={styles.input_value}
                            required
                        />
                        <button
                            type="button"
                            onClick={handleVerifyCode}
                            className={styles.verify_btn}
                            disabled={!verificationCode}
                        >
                            인증 코드 확인
                        </button>
                    </>
                )}
            </label>

            <label className={styles.label_container}>
                <input
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="이름"
                    className={styles.input_value}
                    required
                />
            </label>

            <label className={styles.label_container}>
                <input
                    id="birth"
                    name="birth"
                    value={user.birth}
                    onChange={handleChange}
                    placeholder="생년월일 8자리"
                    className={styles.input_value}
                    required
                />
            </label>
            <label className={styles.label_container}>
                <input
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="핸드폰 번호(-)금지"
                    className={styles.input_value}
                    required
                />
            </label>

            <Postcode onAddressChange={handleAddressChange} />

            <label className={styles.label_container}>
                <input
                    id="referrer"
                    name="referrer"
                    value={user.referrer}
                    onChange={handleChange}
                    placeholder="추천인"
                    className={styles.input_value}
                />
            </label>
            <button type="submit" disabled={disableButton || !emailVerified} className={styles.join_btn}>
                가입하기
            </button>
        </form>
    );
};

export default Signup;
