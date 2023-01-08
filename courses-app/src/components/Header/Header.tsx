import { Box, Flex, Text, Stack, Button } from '@chakra-ui/react';
import { Logo } from './components/Logo/Logo';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { LogOut } from '../../store/user/asyncActions';
import { selectAuthData } from '../../store/user/selectors';
import { ROUTES } from '../../router/_Routes';

export default function Header() {
  const { isAuth, userName } = useAppSelector(selectAuthData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(LogOut());
    navigate(ROUTES.courses);
  };

  return (
    <Box>
      <Flex
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <NavLink to="/">
            <Logo></Logo>
          </NavLink>
        </Flex>

        {isAuth ? (
          <>
            <Text p={2}>{userName}</Text>
            <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
              <Button onClick={logOut}>LogOut</Button>
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
