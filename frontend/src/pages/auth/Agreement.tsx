import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AgreementJoin } from "../../typings/agreement";
import styles from "./Agreement.module.css";

const Agreement = () => {
    const [allIsChecked, setAllIsChecked] = useState(false);
    const [agreement, setAgreement] = useState<AgreementJoin[]>([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

    const onSingleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;
        setAgreement(
            agreement.map((item) =>
                targetValue === item.value
                    ? { ...item, checked: !item.checked }
                    : { ...item }
            )
        );
        console.log(agreement);
    };

    useEffect(() => {
        fetch("/mock/agreements.json")
            .then((response) => response.json())
            .then((data) => {
                setAgreement(
                    data.map((agreement: any) => ({
                        ...agreement,
                        checked: false,
                    }))
                );
            })
            .catch((error) => console.error("Error fetching agreements:", error));
    }, []);

    useEffect(() => {
        const requiredAgreementsChecked = agreement.every(
            (item) => !item.children.includes("[필수]") || item.checked
        );
        setIsButtonDisabled(!requiredAgreementsChecked);
    }, [agreement]);

    const onAllCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setAllIsChecked(checked);
        setAgreement(agreement.map((item) => ({ ...item, checked })));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate("/login/signup", { state: { agreement } });
    };

    return (
        <div className={styles.form_container}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            onChange={onAllCheck}
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
                                onChange={onSingleCheck}
                                value={item.value}
                                checked={item.checked}
                                name={item.name}
                                className={styles.input_checkbox}
                                required={item.children.includes("[필수]")}
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
                <span>
          <button
              className={`${styles.agreement_btn} ${
                  !isButtonDisabled ? styles.active : ""
              }`}
              disabled={isButtonDisabled}
          >
            동의하고 진행하기
          </button>
        </span>
            </form>
        </div>
    );
};

export default Agreement;
