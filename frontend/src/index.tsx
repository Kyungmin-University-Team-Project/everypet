import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createBrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query'; // React Query import
import ProductPage from './pages/category/ProductPage';
import Root from './pages/home/Root';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Findauth from './pages/auth/Findauth';
import store from './redux/store/store';
import Agreement from './pages/auth/Agreement';
import Exhibitions from './pages/category/Exhibitions';

import MoreInformation from "./pages/moreInformation/MoreInformation";
import DeliveryInquiry from "./pages/userService/DeliveryInquiry";
import Information from "./pages/moreInformation/Information";
import Review from "./pages/moreInformation/review";
import ProductInquiry from "./pages/moreInformation/ProductInquiry";
import SellerInformation from "./pages/moreInformation/SellerInformation";
import Cart from "./pages/userService/Cart";
import SearchPage from "./pages/category/SearchPage";
import MyPage from "./pages/userService/MyPage";
import TimeDeal from "./pages/category/TimeDeal";
import ProtectedRoute from "./utils/route/ProtectedRoute";
import RestrictedRoute from "./utils/route/RestrictedRoute";


const router = createBrowserRouter([
    // 모두 접속 가능
    {
        path: '/',
        element: <Root/>,
        children: [
            {path: 'exhibitions', element: <Exhibitions category={'coupon'}/>},
            {path: 'timeDeal', element: <TimeDeal category={'timeDeal'}/>},
            {path: 'dog', element: <ProductPage category={'dog'}/>},
            {path: 'cat', element: <ProductPage category={'cat'}/>},
            {path: 'rat', element: <ProductPage category={'rat'}/>},
            {path: 'bird', element: <ProductPage category={'bird'}/>},
            {path: 'reptiles', element: <ProductPage category={'reptiles'}/>},
            {
                path: 'moreInformation',
                element: <MoreInformation/>,
                children: [
                    {path: 'information', element: <Information/>},
                    {path: 'review', element: <Review/>},
                    {path: 'product-inquiry', element: <ProductInquiry/>},
                    {path: 'seller-information', element: <SellerInformation/>},
                ],
            },
            {path: 'search', element: <SearchPage/>}, // SearchPage route
        ],
    },

    // 로그인 유저만 접속가능
    {
        path: 'myPage',
        element: <ProtectedRoute/>,
        children: [
            {path: '', element: <MyPage/>},
        ],
    },
    {
        path: 'deliveryInquiry',
        element: <ProtectedRoute/>,
        children: [
            {path: '', element: <DeliveryInquiry/>},
        ],
    },
    {
        path: 'cart',
        element: <ProtectedRoute/>,
        children: [
            {path: '', element: <Cart/>},
        ],
    },

    // 비로그인 유저만 접속가능
    {
        path: 'login',
        element: <RestrictedRoute/>,
        children: [
            {path: '', element: <Login/>},
            {path: 'agreement', element: <Agreement/>},
            {path: 'signup', element: <Signup/>},
            {path: 'forgot-password', element: <Findauth/>},
        ],
    },

]);

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
