// src/components/GoogleAuth.tsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { loginState } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import cryptoJs from 'crypto-js';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSuccess = (response: CredentialResponse) => {
        if (response.credential) {
            const userObject: any = jwtDecode(response.credential);
            const encryptedAccess = cryptoJs.AES.encrypt(response.credential, "secret-key").toString();

            dispatch(loginState({ username: userObject.name, accessToken: encryptedAccess }));
            navigate('/');
        }
    };

    const handleFailure = () => {
        console.log('Google login failed');
    };

    // Retrieve the client ID from environment variables
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    if (!clientId) {
        console.error('Google Client ID is not defined');
        return null;
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleFailure}
                useOneTap
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
