import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import ProductPage from './pages/category/ProductPage';
import Root from './pages/home/Root';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import IdFind from './pages/auth/IdFind';
import store from './redux/store/store';
import Agreement from './pages/auth/Agreement';
import Exhibitions from './pages/category/Exhibitions';
import MoreInformation from "./pages/moreInformation/MoreInformation";
import DeliveryInquiry from "./pages/userService/DeliveryInquiry";
import Information from "./pages/moreInformation/Information";
import SellerInformation from "./pages/moreInformation/SellerInformation";
import Cart from "./pages/userService/Cart";
import SearchPage from "./pages/category/SearchPage";
import MyPage from "./pages/userService/MyPage";
import TimeDeal from "./pages/category/TimeDeal";
import ProtectedRoute from "./utils/route/ProtectedRoute";
import RestrictedRoute from "./utils/route/RestrictedRoute";
import Review from "./pages/moreInformation/review";
import Payment from "./pages/userService/Payment";
import UserInfo from "./pages/userService/mySubPage/UserInfo";
import OrderManagement from "./pages/userService/mySubPage/OrderManagement";
import AddressManagement from "./pages/userService/mySubPage/AddressManagement";
import PointsAndCoupons from "./pages/userService/mySubPage/PointsAndCoupons";
import InquiryHistory from "./pages/userService/mySubPage/InquiryHistory";
import PasswordFind from "./pages/auth/PasswordFind";

const router = createBrowserRouter([
    // 모두 접속 가능
    {
        path: '/',
        element: <Root/>,
        children: [
            {path: 'exhibitions', element: <Exhibitions category={'coupon'}/>},
            {path: 'timeDeal', element: <TimeDeal category={'timeDeal'}/>},
            { path: ':category/:subcategory?', element: <ProductPage /> },  // 동적 경로 설정,
            {
                path: 'moreInformation',
                element: <MoreInformation/>,
                children: [
                    {path: 'information', element: <Information/>},
                    {path: 'review', element: <Review/>},
                    {path: 'seller-information', element: <SellerInformation/>},
                ],
            },
            {path: 'search', element: <SearchPage/>},
        ],
    },

    // 로그인 유저만 접속가능
    {
        path: '/',
        element: <ProtectedRoute/>,
        children: [
            {
                path: 'myPage',
                element: <MyPage/>,
                children: [
                    {path: 'userInfo', element: <UserInfo/>},
                    {path: 'orderManagement', element: <OrderManagement/>},
                    {path: 'addressManagement', element: <AddressManagement/>},
                    {path: 'pointsAndCoupons', element: <PointsAndCoupons/>},
                    {path: 'inquiryHistory', element: <InquiryHistory/>},
                ],
            },
            {path: 'deliveryInquiry', element: <DeliveryInquiry/>},
            {path: 'cart', element: <Cart/>},
            {path: 'payment', element: <Payment/>}, // 결제 페이지 라우팅 추가
        ],
    },

    // 비로그인 유저만 접속 가능
    {
        path: 'login',
        element: <RestrictedRoute/>,
        children: [
            {path: '', element: <Login/>},
            {path: 'agreement', element: <Agreement/>},
            {path: 'signup', element: <Signup/>},
            {path: 'idFind', element: <IdFind/>},
            {path: "passwordFind", element: <PasswordFind/>}
        ],
    },
]);

const queryClient = new QueryClient();
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
