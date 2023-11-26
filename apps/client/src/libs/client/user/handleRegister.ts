import axios from 'axios';
import { setToken, setUser } from '../../features/userSlice';
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';

export default async function handleRegister(
  values: {
    username: string;
    email: string;
    password: string;
  },
  dispatch: Dispatch<AnyAction>,
  callback = () => {}
) {
  try {
    const url = `/api/auth/register`;
    const res = await axios.post(url, {
      username: values.username,
      email: values.email,
      password: values.password,
    });
    if (res.data.user || res.data.jwt) {
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.jwt));
      callback();
    }
    if (res?.data?.message) {
      return { error: res?.data?.message ?? 'Unknown Error' };
    }
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
