import React from 'react';
import { createContext, useContext } from 'react';
import useToken from '../hooks/useLocalStorage';

import useAuthService from '../services/auth.servise';

type USER = {
  email?: string;
  name?: string;
};

interface IAuthContext {
  isAuth: boolean;
  user: USER | null;
  signUp: (body: any) => void;
  logIn: (body: any) => void;
  logOut: (body: any) => void;
}

const AuthContext = createContext({} as IAuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

const initialState = {
  user: null,
  isLoading: false,
  error: '',
};

type Props = {
  children: JSX.Element;
};

export function AuthProvider({ children }: Props) {
  const [userState, setUserState] = React.useState(initialState);
  const { loginUser, registerUser, getUser } = useAuthService();
  const { token, setToken, deleteToken } = useToken();

  React.useEffect(() => {
    if (token) {
      getCurrentUser(token);
    }
  }, []);

  const signUp = async (body: any) => {
    const { token } = await registerUser(body);
    if (token) {
      await getUser();
    }
  };

  const logIn = async (body: any) => {
    const res = await loginUser(body);

    if (res.successful) {
      setToken(res.result);

      setUserState({ ...userState, user: res.user });
    }
  };

  const logOut = () => {
    deleteToken();
  };

  const getCurrentUser = async (token: string) => {
    const res = await getUser();

    if (res.successful) {
      setToken(token);
      setUserState({ ...userState, user: res.result });
    } else {
      deleteToken();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: !!token,
        user: userState.user,
        signUp,
        logIn,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
