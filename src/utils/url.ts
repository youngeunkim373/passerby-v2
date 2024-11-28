import CryptoJS from 'crypto-js';

import { Pagination } from '@/hooks/usePagination';
import { CustomError } from '@/utils/error';

const cryptoSecretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET;

/* -------------------- 암호화 -------------------- */ 
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

/* -------------------- 복호화 -------------------- */ 
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

/* -------------------- filter -> queryString -------------------- */
export const changeFilterToQueryString = (filterObj: Record<string, unknown>) => {
  const objPairs: string[] = [];

  for (const key in filterObj) {
    if (
      filterObj.hasOwnProperty(key) 
      && filterObj[key] !== null 
      && filterObj[key] !== ''
      && filterObj[key] !== undefined
    ) {
      const param = encodeURIComponent(key) 
          + '=' 
          + encodeURIComponent(JSON.stringify(filterObj[key]));

      objPairs.push(param);
    }
  }
    
  return objPairs.join('&');
};

/* -------------------- queryString -> filter -------------------- */
export const changeQueryStringToFilter = <TFilter>(searchParams: URLSearchParams): Pagination<TFilter> => {
  const queryParams = {
    page: 1,
    size: 10,
    filter: {} as TFilter,
  };

  for (const param of searchParams.entries()) {
    const [ key, value ] = param;

    if(key === 'page' || key === 'size') {
      queryParams[key] = +value;
      continue;
    }

    queryParams.filter[key as keyof TFilter] = JSON.parse(value);
  }

  return queryParams;
};