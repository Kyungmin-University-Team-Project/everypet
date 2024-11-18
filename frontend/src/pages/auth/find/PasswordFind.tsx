import React, {useState} from 'react';
import axios from "axios";
import styles from "./Findauth.module.css";
import {passwordFind, sendVerificationEmail} from "../../../utils/auth/AuthAPI";
import {Code} from "../../../typings/signup";

interface IdFind {
    email: string;
    memberId: string;
}

const PasswordFind = () => {
    const [user, setUser] = useState<IdFind>({
        email: "",
        memberId: "",
    })
    const [emailSent, setEmailSent] = useState(false);
    const [code, setCode] = useState<Code>({code: ''});
    const [disableButton, setDisableButton] = useState(true);
    const [emailVerified, setEmailVerified] = useState(false);


    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        const isKoreanOrEnglish = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-Za-z]/.test(value);
        if (!isKoreanOrEnglish) setCode({...code, [name]: value});
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(user)
    }

    const handleSendVerificationEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await sendVerificationEmail({purpose: 'PASSWORD_FIND', to: user.email.trim()});
            console.log("Email sent, emailSent:", emailSent);
            setEmailSent(true);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log("Error response data:", error.response.data);
            } else {
                console.log("Error sending verification email:", error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await passwordFind(user);
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
    return (
        <div className={styles.find_form_container}>
            <div className={styles.find_container}>
                <h3 className={styles.find_text}>비밀번호 찾기</h3>
                <form className={styles.find_form} onSubmit={handleSubmit}>
                    <ul className={styles.ul_form}>
                        <li>
                            <label>
                                <input placeholder="아이디" className={styles.find_input}
                                       type='memberId'
                                       name='memberId'
                                       value={user.memberId}
                                       onChange={handleChange}/>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="이메일 입력"
                                    className={styles.find_input}
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </label>
                        </li>
                        {emailSent && (
                            <>
                                <input
                                    name='code'
                                    id='code'
                                    onChange={handleCodeChange}
                                    value={code.code}
                                    placeholder="인증 코드 숫자만 입력이 가능해요!"
                                    className={styles.find_input}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.ul_form_btn}
                                    onClick={() => setEmailVerified(true)}
                                >
                                    인증 코드 확인
                                </button>
                            </>
                        )}
                    </ul>
                    <button className={styles.ul_form_btn} onClick={handleSendVerificationEmail}>이메일 전송</button>
                    <button className={styles.ul_form_btn} disabled={disableButton && !emailVerified}
                    >확인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordFind;