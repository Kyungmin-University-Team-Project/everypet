import React, { useState, MouseEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { AgreementJoin } from "../../typings/agreement";
import styles from "./Agreement.module.css";

const Agreement = () => {
  const [allIsChecked, setAllIsChecked] = useState(false);
  const [agreement, setAgreement] = useState<AgreementJoin[]>([]);

  const onSingleCheck = (e: MouseEvent<HTMLInputElement>) => {
    const targetValue = (e.target as HTMLInputElement).value;
    setAgreement(
      agreement.map((item) =>
        targetValue === item.value
          ? { ...item, checked: !item.checked }
          : { ...item },
      ),
    );
  };

  // Json 이용역관 및 가져오기
  useEffect(() => {
    fetch("/mock/agreements.json") // 절대 경로로 파일을 불러옴
      .then((response) => response.json())
      .then((data) => {
        setAgreement(
          data.map((agreement: any) => ({
            ...agreement,
            checked: false,
          })),
        );
      })
      .catch((error) => console.error("Error fetching agreements:", error));
  }, []);

  const onAllCheck = (e: MouseEvent<HTMLInputElement>) => {
    setAllIsChecked((prev) => !prev);

    if ((e.target as HTMLInputElement).checked) {
      setAgreement(agreement.map((item) => ({ ...item, checked: true })));
    } else {
      setAgreement(agreement.map((item) => ({ ...item, checked: false })));
    }
  };
  return (
    <div className={styles.form_container}>
      <form>
        <div>
          <label>
            <input
              type="checkbox"
              onClick={onAllCheck}
              checked={allIsChecked}
              value="all"
              name="agreement"
              className={styles.input_checkbox}
            />
            모두 동의합니다.
          </label>
          <p className={styles.text}>
            실명 인증된 아이디로 가입, 위치기반서비스 이용약관(선택), 이벤트・
            <br /> 혜택 정보 수신(선택) 동의를 포함합니다.
          </p>
        </div>
        {agreement.map((item) => (
          <div key={item.value} className={styles.label_container}>
            <label>
              <input
                type="checkbox"
                key={item.value}
                onClick={onSingleCheck}
                value={item.value}
                checked={item.checked}
                name={item.name}
                className={styles.input_checkbox}
              />
              <span className={styles.requiredText}>
                {item.children.includes("[필수]") ? "[필수] " : "[선택]"}
              </span>
              {item.children.replace("[필수] ", "").replace("[선택] ", "")}
              <div className={styles.textarea_container}>
                <textarea rows={10} cols={50} className={styles.textarea}>
                  {item.text}
                </textarea>
              </div>
            </label>
          </div>
        ))}
        <Link to="/login/signup">
          <button className={styles.agreement_btn}>동의하고 진행하기</button>
        </Link>
      </form>
    </div>
  );
};

export default Agreement;
