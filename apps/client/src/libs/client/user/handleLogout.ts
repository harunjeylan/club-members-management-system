import { deleteCookie } from 'cookies-next';
// import { revalidateTag } from "next/cache";
import { removeToken, removeUser } from '../../features/userSlice';
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';

export default function handleLogout(
  dispatch: Dispatch<AnyAction>,
  callback = () => {}
) {
  deleteCookie('token');
  if (dispatch) {
    dispatch(removeUser());
    dispatch(removeToken());
    callback();
  }
}
