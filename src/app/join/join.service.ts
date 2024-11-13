'use client';
import { SubmitHandler } from 'react-hook-form';

import { JoinRequestDTO, SendVerificationEmailDTO } from '@/app/join/join.interface';
import { CustomError } from '@/utils/error';

/* -------------------- 회원가입 -------------------- */ 
export const join: SubmitHandler<JoinRequestDTO> = async (body) => { 
  try {
    const res = await fetch('/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await res.json();

    if(response.status !== 200) {
      throw new CustomError(response.status, response.message);
    }

    return response;
  } catch (err) {
    console.error('An error occurs: ', err);

    if(err instanceof CustomError) {
      throw new CustomError(err.statusCode, err.message);
    }

    throw err; 
  }
};

/* -------------------- 이메일 본인인증 메일 전송 -------------------- */ 
export const sendVerificationEmail = async (body: SendVerificationEmailDTO) => {
  try {
    const res = await fetch('/api/join/verifyEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await res.json();

    if(response.status !== 200) {
      throw new CustomError(response.status, response.message);
    }

    return response;
  } catch (err) {
    console.error('An error occurs: ', err);

    if(err instanceof CustomError) {
      throw new CustomError(err.statusCode, err.message);
    }

    throw err; 
  }
};

