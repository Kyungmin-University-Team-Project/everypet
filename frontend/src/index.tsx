import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'; // Redux의 Provider import
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ProductPage from './pages/category/ProductPage';
import Root from './pages/home/Root';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Findauth from './pages/auth/Findauth';

import store from './redux/store/store';
import Agreement from './pages/auth/Agreement';
import Cupon from './pages/category/Cupon';
import TimeDeal from './pages/category/TimeDeal';
import CustomerService from './pages/deliveryInquiry/CustomerService';
import MoreInformation from "./pages/moreInformation/MoreInformation";

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

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
