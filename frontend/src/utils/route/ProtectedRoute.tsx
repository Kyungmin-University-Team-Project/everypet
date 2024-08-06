import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';

const ProtectedRoute: React.FC = () => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    if (!accessToken) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
};

export default ProtectedRoute;
