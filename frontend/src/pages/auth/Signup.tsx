import React, { useState } from "react";
import axios from "axios";
import { Join } from "../../typings/signup";
import Postcode from "./Postcode";
import styles from "./Signup.module.css";

const Signup = () => {
  const [user, setUser] = useState<Join>({ memberId: "", memberPw: "" });
  const [disableButton, setDisableButton] = useState(true);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("여기에 주소를 입력해주세요.", user);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hi = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();

    if (!inputValue || user.memberId.length < 5 || user.memberPw.length < 5) {
      e.target.placeholder = "아이디를 5글자 이상 입력해주세요.";
      e.target.style.border = "1px solid rgb(231, 62, 62)";
      setDisableButton(true);
    } else {
      setDisableButton(false);
      e.target.style.border = "1px solid #888";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form_container}>
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
          value={user.memberPw} // 비밀번호 입력란의 값을 상태로 설정
          name="memberPw"
          id="memberPwd"
          onChange={handleChange} // 입력이 발생하면 handleChange 함수 호출
          placeholder="비밀번호"
          className={styles.input_value}
          onBlur={hi}
          required
        />
      </label>

      <label className={styles.label_container}>
        <i className={`fa-regular fa-envelope ${styles.i}`}></i>
        <input
          type="email"
          placeholder="이메일"
          className={styles.input_value}
          required
        />
        <button type="button" className={styles.button_input}>
          코드발송
        </button>
      </label>

      <label className={styles.label_container}>
        <span>인증 코드 확인</span>
        <input className={styles.code_input} />
        <button className={styles.code_btn}>코드인증</button>
      </label>
      <p>인증되었습니다.</p>

      <label className={styles.label_container}>
        <i className={`fa-regular fa-user ${styles.i}`}></i>
        <input placeholder="이름" required className={styles.input_value} />
      </label>

      <label className={styles.label_container}>
        <i className={`fa-regular fa-calendar-days ${styles.i}`}></i>
        <input
          placeholder="생년월일 8자리"
          required
          className={styles.input_value}
        />
      </label>
      <label className={styles.label_container}>
        <i className={`fa-regular fa-calendar-days ${styles.i}`}></i>
        <input
          placeholder="핸드폰 번호(-)금지"
          required
          className={styles.input_value}
        />
      </label>

      <Postcode />

      <label className={styles.label_container}>
        <i className={`fa-regular fa-calendar-days ${styles.i}`}></i>
        <input placeholder="추천인" required className={styles.input_value} />
        <button type="submit" className={styles.button_input}>
          인증하기
        </button>
      </label>
      <button
        type="submit"
        disabled={disableButton}
        className={styles.join_btn}
      >
        가입하기
      </button>
    </form>
  );
};

export default Signup;
