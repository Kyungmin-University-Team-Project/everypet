import React, { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Postcode from "./Postcode";
import styles from "./Signup.module.css";
import { signUpLogin } from "../../typings/AuthAPI";
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Log the data being sent
            console.log("Sending user data:", JSON.stringify(user, null, 2));

            const response = await signUpLogin(user);

            console.log("Server response:", response);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                navigate('/');
                // Log detailed error information
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

    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <label htmlFor="memberId" className={styles.label_container}>
                <i className={`fa-regular fa-user ${styles.i}`}></i>
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
                <i className={`fa-solid fa-lock ${styles.i}`}></i>
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
                <i className={`fa-regular fa-envelope ${styles.i}`}></i>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="이메일"
                    className={styles.input_value}
                    value={user.email}
                    onChange={handleChange}
                />
            </label>

            <label className={styles.label_container}>
                <i className={`fa-regular fa-user ${styles.i}`}></i>
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
                <i className={`fa-regular fa-calendar-days ${styles.i}`}></i>
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
                <i className={`fa-regular fa-calendar-days ${styles.i}`}></i>
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
                <i className={`fa-regular fa-calendar-days ${styles.i}`}></i>
                <input
                    id="referrer"
                    name="referrer"
                    value={user.referrer}
                    onChange={handleChange}
                    placeholder="추천인"
                    className={styles.input_value}
                />
            </label>
            <button type="submit" disabled={disableButton} className={styles.join_btn}>
                가입하기
            </button>
        </form>
    );
};

export default Signup;
