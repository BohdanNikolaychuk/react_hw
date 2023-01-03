import { useEffect, useState } from 'react';

export default function useToken() {
  const [token, setToken] = useState<string | null>(() => {
    const token = localStorage.getItem('token');

    return token;
  });



  useEffect(() => {
    if (token !== null) {
      localStorage.setItem('token', token);
    }

  }, [token, ]);

  const deleteToken = () => {
    setToken(null);

    localStorage.removeItem('token');
  };

  return { token,  setToken, deleteToken };
}
