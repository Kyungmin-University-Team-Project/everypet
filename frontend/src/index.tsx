import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query'; // React Query import
import ProductPage from './pages/category/ProductPage';
import Root from './pages/home/Root';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Findauth from './pages/auth/Findauth';
import store from './redux/store/store';
import Agreement from './pages/auth/Agreement';
import Exhibitions from './pages/category/Exhibitions';
import TimeDeal from './pages/category/TimeDeal';
import CustomerService from './pages/userService/CustomerService';

import MoreInformation from "./pages/moreInformation/MoreInformation";
import DeliveryInquiry from "./pages/userService/DeliveryInquiry";
import Information from "./pages/moreInformation/Information";
import Review from "./pages/moreInformation/review";
import ProductInquiry from "./pages/moreInformation/ProductInquiry";
import SellerInformation from "./pages/moreInformation/SellerInformation";
import Cart from "./pages/userService/Cart";
import SearchPage from "./pages/category/SearchPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {path: 'exhibitions', element: <Exhibitions category={'coupon'}/>},
            {path: 'timesale', element: <TimeDeal category={'timesale'}/>},
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

    {path: 'deliveryInquiry', element: <DeliveryInquiry/>},
    {path: 'customer-services', element: <CustomerService/>},
    {path: 'cart', element: <Cart/>},
    {
        path: '/login',
        element: <Login/>,
        children: [
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
