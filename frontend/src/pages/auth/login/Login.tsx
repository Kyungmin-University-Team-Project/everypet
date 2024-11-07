import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginState} from '../../../redux/auth/authSlice';

import styles from './Login.module.css';
import Signup from '../signup/Signup';
import IdFind from '../find/IdFind';
import Agreement from '../signup/Agreement';
import {login} from "../../../utils/auth/AuthAPI";
import {encryptToken} from "../../../utils/auth/token";
import {LoginData} from "../../../typings/login";


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [values, setValues] = useState<LoginData>({
        memberId: '',
        memberPwd: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.id]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await login(values);

            const secretKey = process.env.REACT_APP_CRYPTOJS_KEY;
            if (!secretKey) {
                throw new Error('CRYPTOJS_KEY is not defined in the environment variables');
            }

            const encryptedAccess = encryptToken(response.access);
            localStorage.setItem('access', encryptedAccess);
            dispatch(loginState({username: response.user, accessToken: encryptedAccess}));

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setShowLoginForm(
            !['/login/signup', '/login/forgot-password', '/login/agreement'].includes(
                location.pathname
            )
        );
    }, [location.pathname]);

    return (
        <div className={styles.login_box}>
            <section className={styles.login_section}>
                <h1 className={styles.login_mainText}>에브리펫</h1>
                {showLoginForm && (
                    <form className={styles.login_input} onSubmit={handleSubmit}>
                        <label htmlFor="memberId" className={styles.input_label}>
                            <p className={styles.login_text}>아이디</p>
                            <div className={styles.input_field}>
                                <input
                                    placeholder="아이디"
                                    id="memberId"
                                    name="memberId"
                                    value={values.memberId}
                                    onChange={handleChange}
                                    className={styles.input_input}
                                />
                            </div>
                        </label>

                        <label htmlFor="memberPwd" className={styles.input_label}>
                            <p className={styles.login_text}>비밀번호</p>
                            <div className={styles.input_field}>
                                <input
                                    type="password"
                                    placeholder="비밀번호"
                                    id="memberPwd"
                                    name="memberPwd"
                                    className={styles.input_input}
                                    value={values.memberPwd}
                                    onChange={handleChange}
                                />
                            </div>
                        </label>

                        <div>
                            <label htmlFor="checkbox" className={styles.checkbox_label}>
                                <input
                                    className={styles.login_checkbox}
                                    type="checkbox"
                                    id="checkbox"
                                />
                                <i className={styles.circle}></i>
                                <span> 로그인 상태 유지!</span>
                            </label>
                        </div>
                        <button className={styles.login_btn}>로그인</button>
                        <Link to="/">
                            <button className={styles.login_btn}>홈으로 가기</button>
                        </Link>
                        <p className={styles.login_link}>
                            <Link to="/login/idFind">아이디/비밀번호 찾기 |</Link>
                            <Link to="/login/agreement">회원가입</Link>
                        </p>
                    </form>
                )}
            </section>
            {location.pathname === '/login/signup' ? <Signup/> : null}
            {location.pathname === '/login/forgot-password' ? <IdFind/> : null}
            {location.pathname === '/login/agreement' ? <Agreement/> : null}
        </div>
    );
};

export default Login;
