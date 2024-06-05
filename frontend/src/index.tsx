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
import Cupon from './pages/category/Cupon';
import TimeDeal from './pages/category/TimeDeal';
import CustomerService from './pages/userService/CustomerService';
import MoreInformation from './pages/moreInformation/MoreInformation';
import DeliveryInquiry from './pages/userService/DeliveryInquiry';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
    },
    {
        path: '/coupon',
        element: <Cupon category={'coupon'}/>,
    },
    {
        path: '/timesale',
        element: <TimeDeal category={'timesale'}/>,
    },
    {
        path: '/dog',
        element: <ProductPage category={'dog'}/>,
    },
    {
        path: '/cat',
        element: <ProductPage category={'cat'}/>,
    },
    {
        path: '/rat',
        element: <ProductPage category={'rat'}/>,
    },
    {
        path: '/bird',
        element: <ProductPage category={'bird'}/>,
    },
    {
        path: '/reptiles',
        element: <ProductPage category={'reptiles'}/>,
    },
    {
        path: '/moreInformation',
        element: <MoreInformation/>,
    },
    {
        path: '/deliveryInquiry',
        element: <DeliveryInquiry/>,
    },
    {
        path: '/login',
        element: <Login/>,
        children: [
            {path: 'agreement', element: <Agreement/>},
            {path: 'signup', element: <Signup/>},
            {path: 'forgot-password', element: <Findauth/>},
        ],
    },
    {
        path: '/customer-services',
        element: <CustomerService/>,
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
