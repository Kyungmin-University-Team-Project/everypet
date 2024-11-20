import axios from 'axios';
import {decryptToken, reissueToken} from '../auth/token';
import {API_URL} from "../../api/api";

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 쿠키를 포함하여 요청을 보냄
});

// 인터셉트 처리
axiosInstance.interceptors.request.use(
    async (config) => {
        let token = decryptToken();
        if (token) {
            config.headers['every-pet-client-access'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    // 응답이 성공적으로 돌아왔을 때
    (response) => {
        return response;
    },
    // 에러 처리
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newToken = await reissueToken();
            if (newToken) {
                originalRequest.headers['every-pet-client-access'] = newToken;
                // console.log('토큰 재발급 성공:', newToken);
                // 원래 요청을 재실행
                return axiosInstance(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
