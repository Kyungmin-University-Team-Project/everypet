import React, {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Productcategory from '../../layout/category/ProductCategory';
import Home from './Home';
import Header from '../../layout/Header/Header';
import Fixedheader from '../../layout/Header/Fixedheader';
import Footer from "../../components/home/Footer";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";

const Root = () => {
    const location = useLocation();

    useEffect(() => {
        const beforeUnloadHandler = (event: any) => {
            event.preventDefault();
            event.returnValue = ''; // 브라우저에 표시되는 메시지입니다.
            // 여기에 실행시키고자 하는 함수를 추가합니다.
            // 예: console.log("브라우저를 닫는다!");

            // 서버로 디비 토큰 삭제 요청
            // 로컬의 쿠키 삭제
        };

        // beforeunload 이벤트 리스너 추가
        window.addEventListener('beforeunload', beforeUnloadHandler);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
        };
    }, []);

    return (
        <>
            <Fixedheader/>
            <Header/>
            <Productcategory/>
            {location.pathname === '/' ? <Home/> : <Outlet/>}
            <ScrollToTopButton/>
            <Footer/>
        </>
    );
};

export default Root;
