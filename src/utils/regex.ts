export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validateEmail = (email: string) => {
  return emailRegex.test(email);
};

// 최소 8자 이상 + 대문자 or 소문자, 숫자, 특수문자(@$!%*#?&) 포함
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const validatePassword = (password: string) => {
  return passwordRegex.test(password);
};

// 2 ~ 20자 이상 + 한글, 대문자 or 소문자, 숫자, 특수문자(₩~!@#$%^&*-_=+) 포함
export const nicknameRegex =  /^[가-힣a-zA-Z0-9₩~!@#$%^&*-_=+]{2,20}$/;
export const validateNickname = (nickname: string) => {
  return nicknameRegex.test(nickname);
};

