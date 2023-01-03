import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ChakraProvider>,
);
