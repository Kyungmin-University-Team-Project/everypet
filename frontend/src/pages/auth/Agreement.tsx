import React, { useState, MouseEvent, useEffect } from "react";

const Agreement = () => {
  const [allIsChecked, setAllIsChecked] = useState(false);
  const [agreement, setAgreement] = useState([
    {
      name: "agreement",
      value: "check1",
      children: "[필수] 만 14세 이상입니다.",
      checked: false,
    },
    {
      name: "agreement",
      value: "check2",
      children: "[필수] 에브리펫 서비스 이용약관 동의",
      checked: false,
    },
    {
      name: "agreement",
      value: "check3",
      children: "[필수] 개인정보 수집 및 이용 동의",
      checked: false,
    },
    {
      name: "agreement",
      value: "check4",
      children: "[선택] 마케팅 정보 수신에 대한 동의",
      checked: false,
    },
  ]);

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

  useEffect(() => {
    setAllIsChecked(agreement.every((item) => item.checked));
  }, [agreement]);

  const onAllCheck = (e: MouseEvent<HTMLInputElement>) => {
    setAllIsChecked((prev) => !prev);

    if ((e.target as HTMLInputElement).checked) {
      setAgreement(agreement.map((item) => ({ ...item, checked: true })));
    } else {
      setAgreement(agreement.map((item) => ({ ...item, checked: false })));
    }
  };
  return (
    <div>
      <h2>회원가입</h2>
      <p>-------------</p>
      <p>환영합니다! 에브리펫 서비스에 이용약관에 동의해주세요.</p>
      <form>
        <div>
          <label>
            <input
              type="checkbox"
              onClick={onAllCheck}
              checked={allIsChecked}
              value="all"
              name="agreement"
            />
            모두 동의합니다.
          </label>
        </div>
        <p>-------------</p>
        {agreement.map((item) => (
          <div key={item.value}>
            <label>
              <input
                type="checkbox"
                key={item.value}
                onClick={onSingleCheck}
                value={item.value}
                checked={item.checked}
                name={item.name}
              />
              {item.children}
            </label>
          </div>
        ))}
        <p>만 14세 이상 회원 가입 가능합니다.</p>
        <button>동의하고 진행하기</button>
      </form>
    </div>
  );
};

export default Agreement;
