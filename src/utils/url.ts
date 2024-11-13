import CryptoJS from 'crypto-js';

import { CustomError } from '@/utils/error';

const cryptoSecretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET;

// 암호화
export const encryptObjectToUrl = (obj: object): string => {
  if(!cryptoSecretKey) {
    throw new CustomError(500, 'url 생성 중 오류가 발생했습니다.');
  }

  const jsonString = JSON.stringify(obj);

  // AES 암호화
  const encrypted = CryptoJS.AES.encrypt(jsonString, cryptoSecretKey).toString();

  // Base64 URL-safe encoding
  const urlSafeString = encodeURIComponent(encrypted);

  return urlSafeString;
};

// 복호화
export const decryptUrlToObject = (urlSafeString: string): object | null => {
  if(!cryptoSecretKey) {
    throw new CustomError(500, 'url 생성 중 오류가 발생했습니다.');
  }

  try {
    // Base64 URL-safe decoding
    const decryptedData = decodeURIComponent(urlSafeString);

    // AES 복호화
    const bytes = CryptoJS.AES.decrypt(decryptedData, cryptoSecretKey);
    const jsonString = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};