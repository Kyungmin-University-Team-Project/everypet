// utils/auth.ts

import CryptoJS from 'crypto-js';

const secretKey = 'secret-key';

export const decryptToken = (): string | null => {
    const encryptedToken = localStorage.getItem('access');
    if (!encryptedToken) {
        return null;
    }
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
