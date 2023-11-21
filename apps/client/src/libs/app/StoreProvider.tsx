'use client';
import { ReactNode, useLayoutEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { UserWithProfileAndRoles } from 'types/user';
import { setToken, setUser } from '../features/userSlice';
import { store } from './store';

type ProviderPropsType = {
  children: ReactNode | ReactNode[];
  user?: UserWithProfileAndRoles | null | undefined;
  token?: string | null | undefined;
};
function StoreProvider({ children, ...rest }: ProviderPropsType) {
  return (
    <Provider store={store}>
      <GlobalState {...rest}>{children}</GlobalState>
    </Provider>
  );
}
type StatePropsType = {
  children: ReactNode | ReactNode[];
  user?: UserWithProfileAndRoles | null | undefined;
  token?: string | null | undefined;
};
function GlobalState({ children, user, token }: StatePropsType) {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!!user) {
      dispatch(setUser(user));
    }
  }, [user]);

  useLayoutEffect(() => {
    if (!!token) {
      dispatch(setToken(token));
    }
  }, [token]);

  return <>{children}</>;
}

export default StoreProvider;
