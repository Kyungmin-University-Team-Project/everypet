import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {Join} from "./signup";
import {LoginData} from "./Login";
// jwt 4.0 이상
import { jwtDecode } from 'jwt-decode';

export interface ResponseData {
    access: string;
    user: string;
}

const api = axios.create({ baseURL: 'http://localhost:8080/' });

// 401 에러 처리
api.interceptors.request.use(
    function (request) {
        return request;
    },
    async function (error: AxiosError) {
        if (error.response && error.response.status === 401) {
            try {
                let errorConfig: AxiosRequestConfig = error.config || {}; // errorConfig가 undefined인 경우 빈 객체로 설정
                const { data } = await axios.post('access/refresh'); // axios로 요청 보내기
                if (data) {
                    const { access } = data;
                    localStorage.removeItem('access');
                    localStorage.setItem('access', access);
                    if (errorConfig.headers) {
                        errorConfig.headers['Authorization'] = `Bearer ${access}`; // 새로운 토큰으로 헤더 업데이트
                    } else {
                        errorConfig.headers = { Authorization: `Bearer ${access}` }; // 헤더가 없는 경우 새로 생성
                    }
                    return axios.request(errorConfig); // 기존 요청 재시도
                }
            } catch (e) {
                localStorage.removeItem('access');
                console.log(e);
                throw e;
            }
        }
        return Promise.reject(error);
    }
);

export const login = async ({ memberId, memberPwd }: LoginData): Promise<any> => {
    const data = { memberId, memberPwd };

    // Log the payload being sent to the server
    console.log("Payload sent to server:", JSON.stringify(data, null, 2));

    try {
        const response: AxiosResponse<any> = await api.post('/signin', data);

        // Log the response data
        console.log("Server response:", response.data);

        const access = response.headers['access'];

        // Decode the JWT token to extract user information
        // @ts-ignore
        const decodedToken: any = jwtDecode(access);
        const username = decodedToken.username;

        const responseData: ResponseData = {
            access: access,
            user: username
        };

        console.log('Parsed Server Response Data:', responseData);

        return responseData;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
        } else {
            console.error("Error during login:", error);
        }
        throw error;
    }
};

export const signUpLogin = async (user: Join): Promise<any> => {
    // Log the payload being sent to the server
    console.log("Payload sent to server:", JSON.stringify(user, null, 2));

    try {
        const response: AxiosResponse<any> = await api.post('/signup', user);
        // Log the response data
        console.log("Server response:", response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
        } else {
            console.error("Error during signup:", error);
        }
        throw error;
    }
};

export const sendVerificationEmail = async ({
                                                email,
                                            }: {
    email: string;
}): Promise<{ success: boolean }> => {
    const data = { email };
    const response = await api.post('http://localhost:8080/api/send-verification-email', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
};
