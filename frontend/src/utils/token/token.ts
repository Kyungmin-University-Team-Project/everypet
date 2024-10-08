import CryptoJS from 'crypto-js';
import axios from "axios";

const secretKey: string | undefined = process.env.REACT_APP_CRYPTOJS_KEY;

if (!secretKey) {
    throw new Error('CRYPTOJS_KEY is not defined in the environment variables');
}

export const encryptToken = (token: string) => {
    return CryptoJS.AES.encrypt(token, secretKey).toString();
};


export const decryptToken = (): string | null => {
    const encryptedToken = localStorage.getItem('access');
    if (!encryptedToken) {
        return null;
    }
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};


export const reissueToken = async () => {
    try {
        const response = await axios.post('/reissue', {}, {withCredentials: true});
        const newToken = response.headers['access'];
        if (newToken) {
            const encryptedToken = encryptToken(newToken);
            // console.log('토큰 암호화', encryptedToken)
            localStorage.setItem('access', encryptedToken);
        }
        return newToken;
    } catch (error) {
        console.error('토큰 재발급 실패:', error);
        return null;
    }
};
