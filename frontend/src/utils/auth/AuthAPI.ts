import axios, {AxiosResponse} from 'axios';
import {Join} from "../../typings/signup";
import {LoginData} from "../../typings/login";
// jwt 4.0 이상
import {jwtDecode} from 'jwt-decode';
import axiosInstance from "../error/axiosInstance";
import {API_URL} from "../../api/api";


export const login = async ({memberId, memberPwd}: LoginData): Promise<any> => {
    const data = {memberId, memberPwd};

    try {
        const response: AxiosResponse<any> = await axiosInstance.post(`${API_URL}/signin`, data);

        const access = response.headers['access'];

        const decodedToken: any = jwtDecode(access);
        const username = decodedToken.username;

        return {
            access: access,
            user: username
        };

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
    console.log("Payload sent to server:", JSON.stringify(user, null, 2));
    try {
        const response: AxiosResponse<any> = await axiosInstance.post(`${API_URL}/member/signup`, user);
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

export const sendVerificationEmail = async ({purpose, to}: { purpose: string; to: string }): Promise<{
    success: boolean
}> => {
    const data = {purpose, to};
    const response = await axiosInstance.post(`${API_URL}/send-mail/code`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
};

export const verifyCode = async ({purpose, code}: { purpose: string; code: string; }): Promise<{
    success: boolean
}> => {
    const data = {purpose, code};
    const response = await axiosInstance.post(`${API_URL}/send-mail/code/verify`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response.data)

    return response.data;
};

export const passwordFind = async ({email, memberId}: { email: string, memberId: string }) => {
    const data = {email, memberId};
    const response = await axiosInstance.post(`${API_URL}/member/password/reset`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response.data);
    return response.data;
}
