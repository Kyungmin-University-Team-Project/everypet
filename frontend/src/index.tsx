import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Pages1 from './pages/category/Pages1';
import Home from './pages/home/Home';
import Pages3 from './pages/category/Pages3';
import Pages2 from './pages/category/Pages2';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Findauth from './pages/auth/Findauth';
import Pages7 from './pages/category/Pages7';
import Pages6 from './pages/category/Pages6';
import Pages5 from './pages/category/Pages5';
import Pages4 from './pages/category/Pages4';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { path: 'page1', element: <Pages1 /> },
      { path: 'page2', element: <Pages2 /> },
      { path: 'page3', element: <Pages3 /> },
      { path: 'page4', element: <Pages4 /> },
      { path: 'page5', element: <Pages5 /> },
      { path: 'page6', element: <Pages6 /> },
      { path: 'page7', element: <Pages7 /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    children: [
      { path: 'signup', element: <Signup /> },
      { path: 'forgot-password', element: <Findauth /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
