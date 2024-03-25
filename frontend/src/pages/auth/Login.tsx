import { Link, useLocation } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import Signup from "./Signup";
import Findauth from "./Findauth";

const Login = () => {
  const location = useLocation();
  const [showLoginForm, setShowLoginForm] = useState(true);

  // 뒤로가기 눌렀을 떄 로그인 폼 보이기
  useEffect(() => {
    if (
      location.pathname === "/login/signup" ||
      location.pathname === "/login/forgot-password"
    ) {
      setShowLoginForm(false);
    } else {
      setShowLoginForm(true);
    }
  }, [location.pathname]);

  return (
    <div>
      <section id="login-section">
        <h1>에브리펫</h1>
        {showLoginForm && (
          <form>
            <label htmlFor="username">
              <p>아이디</p>
              <FaUser />
              <input
                placeholder="아이디를 입력해주세요."
                id="username"
                name="username"
              />
            </label>
            <label htmlFor="password">
              <p>비밀번호</p>
              <FaLock />
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                id="password"
                name="password"
              />
            </label>
            <label htmlFor="checkbox">
              <div>
                <input type="checkbox" id="checkbox" />
                <span>로그인 상태 유지</span>
              </div>
            </label>
            <button>로그인</button>
            <p>
              <Link to="/login/forgot-password">아이디/비밀번호 찾기</Link> |
              <Link to="/login/signup">회원가입</Link>
            </p>
            <p>구글 카카오 등 로그인</p>
          </form>
        )}
      </section>
      {location.pathname === "/login/signup" ? <Signup /> : null}
      {location.pathname === "/login/forgot-password" ? <Findauth /> : null}
      <Link to="/">
        <button>홈으로 가기</button>
      </Link>
    </div>
  );
};

export default Login;
