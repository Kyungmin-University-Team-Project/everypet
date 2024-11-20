import CryptoJS from 'crypto-js';
import axios from "axios";
import {API_URL} from "../../api/api";

const secretKey: string | undefined = process.env.REACT_APP_CRYPTOJS_KEY;

if (!secretKey) {
    throw new Error('CRYPTOJS_KEY is not defined in the environment variables');
}

export const encryptToken = (token: string) => {
    return CryptoJS.AES.encrypt(token, secretKey).toString();
};


export const decryptToken = (): string | null => {
    const encryptedToken = localStorage.getItem('every-pet-client-access');
    if (!encryptedToken) {
        return null;
    }
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};


export const reissueToken = async () => {
    try {
        const response = await axios.post(`${API_URL}/reissue`, {}, {withCredentials: true});
        const newToken = response.headers['access'];
        if (newToken) {
            const encryptedToken = encryptToken(newToken);
            localStorage.setItem('every-pet-client-access', encryptedToken);
        }
        return newToken;
    } catch (error) {
        console.error('토큰 재발급 실패:', error);
        return null;
    }
};
