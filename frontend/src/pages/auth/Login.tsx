import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Signup from "./Signup";
import Findauth from "./Findauth";
import Agreement from "./Agreement";
import {login} from "../../typings/AuthAPI";
import { LoginData } from "../../typings/Login";
import "@fortawesome/fontawesome-free/css/all.css";

const Login = () => {
  const location = useLocation();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [values, setValues] = useState<LoginData>({
    memberId: "",
    memberPwd: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(values);
      // 서버로부터 받은 토큰을 로컬 스토리지에 저장
      localStorage.setItem("access", response.access);

    } catch (error) {
      console.log(error);
    }
  };

  // Show login form based on current location
  useEffect(() => {
    setShowLoginForm(
      !["/login/signup", "/login/forgot-password", "/login/agreement"].includes(
        location.pathname,
      ),
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
                <i className={`${styles.input_icon} fas fa-user`} />
                <input
                  placeholder="아이디를 입력해주세요."
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
                <i className={`${styles.input_icon} fas fa-lock`} />
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
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
              <Link to="/login/forgot-password">아이디/비밀번호 찾기 |</Link>
              <Link to="/login/agreement">회원가입</Link>
            </p>
            <p className={styles.login_api}>구글 카카오 등 로그인!</p>
          </form>
        )}
      </section>
      {location.pathname === "/login/signup" ? <Signup /> : null}
      {location.pathname === "/login/forgot-password" ? <Findauth /> : null}
      {location.pathname === "/login/agreement" ? <Agreement /> : null}
    </div>
  );
};

export default Login;
