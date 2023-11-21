import axios from "axios";
import { setToken, setUser } from "../features/userSlice";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";

export default async function handleLogin(
  values:{identifier:string,password:string},
  dispatch:Dispatch<AnyAction>,
  callback = () => {}
) {
  try {
    const url = `/api/auth/login`;
    const res = await axios.post(url, {
      identifier: values.identifier,
      password: values.password,
    });
    if (res.data.user || res.data.jwt) {
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.jwt));
      callback();
    }
    if (res?.data?.message) {
      return { error: res?.data?.message ?? "Unknown Error" };
    }
  } catch (error) {
    //@ts-ignore
    return { error: error?.response?.data?.message ?? "Unknown Error" };
  }
}
