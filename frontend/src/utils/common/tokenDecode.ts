// utils/auth.ts

import CryptoJS from 'crypto-js';

const secretKey = "secret-key";

export const decryptToken = (encryptedToken: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
