import React from 'react';
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div>
            <Link to="/">
                <button>
                    홈으로 가기
                </button>
            </Link>
            여기는 로그인 페이지
        </div>
    );
};

export default Login;