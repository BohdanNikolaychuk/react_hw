import React from 'react';
import { Box, Flex, Text, Stack, useColorModeValue, Button } from '@chakra-ui/react';
import { Logo } from './components/Logo/Logo';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export default function Header() {
  const { isAuth, logOut, user } = useAuth();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <NavLink to="/">
            <Logo></Logo>
          </NavLink>
        </Flex>

        {isAuth ? (
          <>
            <Text color={useColorModeValue('gray.800', 'white')}>{user?.name}</Text>
            <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
              <Button as={NavLink} to="/" onClick={logOut}>
                LogOut
              </Button>
              <Button as={NavLink} to="/register">
                Profile
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
              <Button as={NavLink} to="/login">
                Login
              </Button>
              <Button as={NavLink} to="/register">
                Register
              </Button>
            </Stack>
          </>
        )}
      </Flex>
    </Box>
  );
}
