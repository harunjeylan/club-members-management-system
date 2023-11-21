import { createSlice } from '@reduxjs/toolkit';
import { UserWithProfileAndRoles, UserWithRoles } from 'types/user';

const initialState: { user: UserWithRoles | null; token: string | null } = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: { payload: UserWithProfileAndRoles }) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setToken: (state, action: { payload: string }) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});
export const selectCurrentUser = (state: {
  user: { user: UserWithProfileAndRoles };
}) => state.user.user;
export const selectToken = (state: { user: { token: string } }) =>
  state.user.token;
export const { setUser, removeUser, setToken, removeToken } = userSlice.actions;

export default userSlice.reducer;
