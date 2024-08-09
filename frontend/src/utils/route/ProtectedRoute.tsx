import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const accessToken = localStorage.getItem('access');

    if (!accessToken) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
};

export default ProtectedRoute;
