import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Agreement.module.css";
import {AgreementJoin} from "../../typings/signup";

const Agreement: React.FC = () => {
    const [allIsChecked, setAllIsChecked] = useState<boolean>(false);
    const [agreement, setAgreement] = useState<AgreementJoin[]>([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const navigate = useNavigate();

    const onSingleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;
        setAgreement((prevAgreement) =>
            prevAgreement.map((item) =>
                targetValue === item.value
                    ? { ...item, checked: !item.checked }
                    : item
            )
        );
    };

    useEffect(() => {
        fetch("/mock/agreements.json")
            .then((response) => response.json())
            .then((data: AgreementJoin[]) => {
                setAgreement(data.map((agreement) => ({ ...agreement, checked: false, showDetails: false })));
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
        setAgreement((prevAgreement) =>
            prevAgreement.map((item) => ({ ...item, checked }))
        );
    };

    const toggleDetails = (index: number) => {
        setAgreement((prevAgreement) =>
            prevAgreement.map((item, i) =>
                i === index ? { ...item, showDetails: !item.showDetails } : item
            )
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const marketingAgreement = agreement.find(
            (item) => item.value === "check4" && item.checked
        );
        navigate("/login/signup", {
            state: {
                agreeMarketingYn: marketingAgreement ? "Y" : "N",
            },
        });
    };

    return (
        <div className={styles.form_container}>
            <form onSubmit={handleSubmit}>
                <h3 className={styles.main_text}>
                    환영합니다!
                    에브리펫에 가입하시려면 약관에 동의해 주세요
                </h3>
                <div>
                    <label>
                        <input
                            id="agreeMarketingYn"
                            type="checkbox"
                            onChange={onAllCheck}
                            checked={allIsChecked}
                            value="all"
                            name="agreement"
                            className={styles.input_checkbox}
                        />
                        전체 동의하기
                    </label>
                </div>
                {agreement.map((item, index) => (
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
                                {item.children.includes("[필수]") ? "[필수]" : "[선택]"}
                            </span>{" "}
                            {item.children.replace("[필수]", "").replace("[Optional]", "")}
                            <button
                                type="button"
                                className={styles.details_button}
                                onClick={() => toggleDetails(index)}
                            >
                                {item.showDetails ? "[ 접기 ]" : "[ 자세히 보기 ]"}
                            </button>
                            {item.showDetails && (
                                <div className={styles.textarea_container}>
                                    <textarea rows={10} cols={50} className={styles.textarea} readOnly>
                                        {item.text}
                                    </textarea>
                                </div>
                            )}
                        </label>
                    </div>
                ))}
                <span>
                    <p className={styles.p_text}>
                        정보주체의 개인정보 및 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여 안전하게 관리하고 있습니다.
                        자세한 사항은 개인정보처리방침에서 확인할 수 있습니다.
                    </p>
                    <button
                        className={`${styles.agreement_btn} ${!isButtonDisabled ? styles.active : ""}`}
                        disabled={isButtonDisabled}
                    >
                        동의하고 다음으로
                    </button>
                </span>
            </form>
        </div>
    );
};

export default Agreement;
