import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Pages1 from "./pages/category/Pages1";
import Home from "./pages/home/Home";
import Pages3 from "./pages/category/Pages3";
import Pages2 from "./pages/category/Pages2";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Findauth from "./pages/auth/Findauth";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        children: [
            {index: true, element: <Pages1/>},
            {path: "page2", element: <Pages2/>},
            {path: "page3", element: <Pages3/>},
        ]
    },
    {
        path: "/login",
        element: <Login/>,
        children: [
            {path: "signup", element: <Signup/>},
            {path: "forgot-password", element: <Findauth/>},
        ]
    }
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/> </React.StrictMode>
);

reportWebVitals();
