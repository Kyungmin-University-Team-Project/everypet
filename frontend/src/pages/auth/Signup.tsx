import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  interface join {
    memberId: string;
    memberPw: string;
  }

  const [user, setUser] = useState<join>({ memberId: "", memberPw: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("여기에 주소를 입력해주세요.", user);
      setUser(response.data);
    } catch (e: any) {
      setUser(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="memberId">
          <input
            value={user.memberId}
            name="memberId"
            id="memberId"
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="memberPwd">
          <input
            type="password"
            value={user.memberPw}
            name="memberPwd"
            id="memberPwd"
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">가입하기</button>
    </form>
  );
};

export default Signup;
