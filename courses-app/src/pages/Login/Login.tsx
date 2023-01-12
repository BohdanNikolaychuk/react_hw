import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  useDisclosure,
  CloseButton,
} from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

//store
import { useAppDispatch, useAppSelector } from '../../store/store';
import { userLogin } from '../../store/user/asyncActions';
import { selectAuthData } from '../../store/user/selectors';
//const
import { ROUTES } from '../../router/_Routes';

//types
import { ILogin } from '../../@types/IAuth';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isAuth, error } = useAppSelector(selectAuthData);
  const [Show, setShow] = React.useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 7 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILogin>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (UserData: ILogin) => {
    await dispatch(userLogin(UserData));
  };
  if (isAuth) {
    navigate(ROUTES.main);
  }

  const ErrorAlert = (error: string) => {
    if (error !== '') {
      return (
        <>
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </>
      );
    }
  };

  const errorView = ErrorAlert(error);

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" p={12} borderRadius={8} boxShadow="lg">
          <Heading mb={6}>Log In</Heading>

          <Input
            {...register('email')}
            placeholder="johndoe@gmail.com"
            type="email"
            variant="filled"
            mb={3}
          />

          {errors.email?.message && (
            <Alert status="error">
              <AlertIcon />

              <AlertDescription>{errors.email?.message}</AlertDescription>
            </Alert>
          )}

          <Input
            {...register('password')}
            placeholder="******"
            type="password"
            autoComplete="on"
            variant="filled"
            autoCorrect="on"
            mb={6}
          />

          {errors.password?.message && (
            <Alert status="error">
              <AlertIcon />

              <AlertDescription>{errors.password?.message}</AlertDescription>
            </Alert>
          )}

          {errorView}

          <Button disabled={!isValid} type="submit" colorScheme="teal" mb={8}>
            Log In
          </Button>

          <Text mb={6}>
            If you not have an account you can
            <Button as={NavLink} to="/register">
              Register
            </Button>
          </Text>
        </Flex>
      </form>
    </Flex>
  );
};
