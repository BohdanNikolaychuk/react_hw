import React from 'react';
import { createContext, useContext } from 'react';
import { ILogin, IRegistration } from '../@types/IAuth';
import useToken from '../hooks/useLocalStorage';

import useAuthService from '../services/auth.servise';

type USER = {
  email?: string;
  name?: string;
};

interface IAuthContext {
  isAuth: boolean;
  user: USER | null;
  error: string;

  signUp: (body: IRegistration) => void;
  logIn: (body: ILogin) => void;
  logOut: () => void;
}

type ErrorResponse = {
  response: ErrorData;
};

type ErrorData = {
  data: Error;
};

type Error = {
  result: string;
};

const AuthContext = createContext({} as IAuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: JSX.Element;
};

export function AuthProvider({ children }: Props) {
  const [userState, setUserState] = React.useState({
    user: null,
    error: '',
  });
  const { loginUser, registerUser, getUser } = useAuthService();
  const { token, setToken, deleteToken } = useToken();

  React.useEffect(() => {
    if (token) {
      getCurrentUser(token);
    }
  }, []);

  const signUp = async (body: IRegistration) => {
    const { token } = await registerUser(body);
    if (token) {
      await getUser();
    }
  };

  const logIn = async (body: ILogin) => {
    try {
      const res = await loginUser(body);

      if (res.successful) {
        setToken(res.result);
        setUserState({ ...userState, user: res.user });
      }
    } catch (error) {
      console.log();
      let e = (error as ErrorResponse).response.data.result;
      setUserState({ ...userState, error: e });
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
        error: userState.error,

        signUp,
        logIn,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
