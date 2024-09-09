import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const RestrictedRoute: React.FC = () => {
    const accessToken = localStorage.getItem('access');

    if (accessToken) {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
};

export default RestrictedRoute;
