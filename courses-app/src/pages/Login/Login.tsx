import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flex, Heading, Input, Button, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { useAuth } from '../../context/authContext';
import { ILogin } from '../../@types/IAuth';

const Login = () => {
  const navigate = useNavigate();
  const { error, errorStatus, isAuth, logIn } = useAuth();

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
    try {
      logIn(UserData);
    } catch (e) {}
  };
  if (isAuth) {
    navigate('/');
  }

  const ErrorView = () => {
    return (
      !!error && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )
    );
  };

  let errorView = ErrorView();

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
            <Button as={Link} to="/register">
              Register
            </Button>
          </Text>
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
