import axios from '../utils/axios';

import React from 'react';
const useAuthService = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const loginUser = async (UserData: any) => {
    setLoading(true);

    try {
      const { data } = await axios.post('login', UserData);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error as string);
    }
  };

  const registerUser = async (body: any) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`register`, body);
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      setError(error as string);
    }
  };

  const getUser = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`users/me`);

      return data;
    } catch (error) {
      setLoading(false);
      setError(error as string);
    }
  };

  return {
    error,
    loading,
    loginUser,
    registerUser,
    getUser,
  };
};

export default useAuthService;
