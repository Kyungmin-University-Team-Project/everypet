import React, { useState } from "react";
import styles from "./Findauth.module.css";

const Findauth = () => {
  const [activeButton, setActiveButton] = useState<string>("id"); // 타입 추가

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };
  return (
    <div className={styles.find_form_container}>
      <ul className={styles.ul_container}>
        <li className={activeButton === "id" ? styles.active : ""}>
          <button onClick={() => handleButtonClick("id")}>아이디 찾기</button>
        </li>
        <li className={activeButton === "password" ? styles.active : ""}>
          <button onClick={() => handleButtonClick("password")}>
            비밀번호 찾기
          </button>
        </li>
      </ul>
      <div className={styles.find_container}>
        <h3 className={styles.find_text}>아이디 / 비밀번호 찾기</h3>
        <form className={styles.find_form}>
          <ul className={styles.ul_form}>
            <li>
              <label>
                <input placeholder="이름" className={styles.find_input} />
              </label>
            </li>
            <li>
              <label>
                <input
                  type="email"
                  placeholder="이메일 입력"
                  className={styles.find_input}
                />
              </label>
            </li>
          </ul>
          <button className={styles.ul_form_btn}>인증번호 전송</button>
          <button className={styles.ul_form_btn}>인증</button>
        </form>
      </div>
    </div>
  );
};

export default Findauth;
