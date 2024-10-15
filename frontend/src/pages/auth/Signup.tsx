import React, {FormEvent, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Postcode from "./Postcode";
import styles from "./Signup.module.css";

import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
import {Code, Join} from "../../typings/signup";
import {sendVerificationEmail, signUpLogin, verifyCode} from "../../utils/auth/AuthAPI";

const validateInput = (value: string, allowKorean: boolean, allowEnglish: boolean) => {
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ가-힣]/.test(value);
    const hasEnglish = /[A-Za-z]/.test(value);
    // 조건에 따른 필터링
    if (!allowKorean && hasKorean) return false;
    return !(!allowEnglish && hasEnglish);

}

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
    const [code, setCode] = useState<Code>({code: ''});
    const [disableButton, setDisableButton] = useState(true);
    const [emailSent, setEmailSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signUpLogin(user);
            navigate('/')
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        let allowKorean = true;
        let allowEnglish = true;
        // 필드별 검증 규칙 설정
        if (name === "referrer" || name === "email" || name === "code") allowKorean = false;
        if (name === 'memberId') allowKorean = false;
        // 입력값 검증
        if (validateInput(value, allowKorean, allowEnglish)) {
            setUser((prevUser) => {
                // 주소 관련 필드만 업데이트
                if (name === "address" || name === "detailAddress") {
                    return {
                        ...prevUser,
                        address: {
                            ...prevUser.address,
                            [name]: value,
                        },
                    };
                } else {
                    // 다른 필드 업데이트
                    return {
                        ...prevUser,
                        [name]: value,
                    };
                }
            });
        }
    }

    const handleMaxLength = (e: FormEvent<HTMLInputElement>, maxLength: number) => {
        const inputElement = e.target as HTMLInputElement;
        const {value} = inputElement;
        if (value.length > maxLength) {
            inputElement.value = value.substr(0, maxLength);
        }
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        const isKoreanOrEnglish = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-Za-z]/.test(value);
        if (!isKoreanOrEnglish) setCode({...code, [name]: value});
    }

    const handleAddressChange = (address: string, detailAddress: string) => {
        setUser({...user, address: {address, detailAddress}});
    };

    const handleSendVerificationEmail = async () => {
        try {
            await sendVerificationEmail({purpose: 'SIGNUP', to: user.email.trim()});
            setEmailSent(true);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log("Error response data:", error.response.data);
            } else {
                console.log("Error sending verification email:", error);
            }
        }
    };

    const handleVerifyCode = async () => {
        try {
            await verifyCode({purpose: 'SIGNUP', code: code.code});
            console.log()
            setEmailVerified(true);
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
                    placeholder="아이디 영어, 숫자, 특수문자만 입력이 가능해요!"
                    className={styles.input_value}
                    required
                    onInput={(e) => {
                        handleMaxLength(e, 15)
                    }}
                />
            </label>
            <label htmlFor="memberPwd" className={styles.label_container}>
                <input
                    type="password"
                    value={user.memberPwd}
                    name="memberPwd"
                    id="memberPwd"
                    onInput={(e) => {
                        handleMaxLength(e, 15)
                    }}
                    onChange={handleChange}
                    placeholder="비밀번호"
                    className={styles.input_value}
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
                    onInput={(e) => {
                        handleMaxLength(e, 35)
                    }}
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
                            name='code'
                            id='code'
                            onChange={handleCodeChange}
                            value={code.code}
                            placeholder="인증 코드 숫자만 입력이 가능해요!"
                            className={styles.input_value}
                            onInput={(e) => {
                                handleMaxLength(e, 4)
                            }}
                            required
                        />
                        <button
                            type="button"
                            onClick={handleVerifyCode}
                            className={styles.verify_btn}
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
                    onInput={(e) => {
                        handleMaxLength(e, 25)
                    }}
                    required
                />
            </label>

            <label className={styles.label_container}>
                <input
                    type='date'
                    id="birth"
                    name="birth"
                    value={user.birth}
                    onChange={handleChange}
                    placeholder="생년월일 입력 해주세요."
                    className={styles.input_value}
                    onInput={(e) => {
                        handleMaxLength(e, 10)
                    }}
                    required
                />
            </label>
            <label className={styles.label_container}>
                <input
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="핸드폰 번호"
                    className={styles.input_value}
                    onInput={(e) => {
                        handleMaxLength(e, 15)
                    }}
                    required
                />
            </label>

            <Postcode onAddressChange={handleAddressChange}/>

            <label className={styles.label_container}>
                <input
                    id="referrer"
                    name="referrer"
                    value={user.referrer}
                    onChange={handleChange}
                    placeholder="추천인 영어만 입력이 가능해요!"
                    onInput={(e) => {
                        handleMaxLength(e, 10)
                    }}
                    className={styles.input_value}
                />
            </label>
            <button type="submit" disabled={disableButton && !emailVerified} className={styles.join_btn}>
                가입하기
            </button>
        </form>
    );
};

export default Signup;
