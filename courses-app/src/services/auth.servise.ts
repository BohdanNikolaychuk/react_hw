import axios from '../utils/axios';

import React from 'react';
import { ILogin, IRegistration } from '../@types/IAuth';

const useAuthService = () => {
  const [loading, setLoading] = React.useState(false);

  const loginUser = async (UserData: ILogin) => {
    setLoading(true);

    const { data } = await axios.post('login', UserData);
    setLoading(false);
    return data;
  };

  const registerUser = async (body: IRegistration) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`register`, body);
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
    }
  };

  const getUser = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`users/me`);

      return data;
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    loading,
    loginUser,
    registerUser,
    getUser,
  };
};

export default useAuthService;
