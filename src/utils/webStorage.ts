/* ----------- local storage ----------- */
const localStorageKeys: string[] = [ 'accessToken', 'refreshToken' ];

const checkLocalStorageItem = (key: string) => {
  if (process.env.NODE_ENV === 'development') {
    if(!localStorageKeys.find((existKey) => existKey === key)) {
      throw new Error(`${key} is not a key managed by localStorage`);
    }
  }
};

export const getLocalStorageItem = (key: string) => {
  checkLocalStorageItem(key);
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, token: string) => {
  checkLocalStorageItem(key);
  localStorage.setItem(key, token);
};

export const removeLocalStorageItem = (key: string) => {
  checkLocalStorageItem(key);
  localStorage.removeItem(key);
};

/* ----------- sesion storage ----------- */
const sessionStorageKeys: string[] = [];

const checkSessionStorageItem = (key: string) => {
  if (process.env.NODE_ENV === 'development') {
    if(!sessionStorageKeys.find((existKey) => existKey === key)) {
      throw new Error(`${key} is not a key managed by sessionStorage`);
    }
  }
};

export const getSessionStorageItem = (key: string) => {
  checkSessionStorageItem(key);
  sessionStorage.getItem(key);
};

export const setSessionStorageItem = (key: string, token: string) => {
  checkSessionStorageItem(key);
  sessionStorage.setItem(key, token);
};

export const removeSessionStorageItem = (key: string) => {
  checkSessionStorageItem(key);
  sessionStorage.removeItem(key);
};