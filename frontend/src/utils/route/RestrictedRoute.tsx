import React, {useEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../redux/store/store';
import {setUsernameFromLocalStorageState} from '../../redux/auth/authSlice';

const RestrictedRoute: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
        dispatch(setUsernameFromLocalStorageState());
    }, [dispatch]);

    console.log(accessToken);

    if (accessToken) {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
};

export default RestrictedRoute;
