import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flex, Heading, Input, Button, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../context/authContext';

interface IFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { isAuth, logIn } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (UserData: IFormInputs) => {
    logIn(UserData);
  };
  if (isAuth) {
    navigate('/');
  }
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
          <div className="invalid-feedback">{errors.email?.message}</div>
          <Input
            {...register('password')}
            placeholder="**********"
            type="password"
            autoComplete="on"
            variant="filled"
            autoCorrect="on"
            mb={6}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
          <Button type="submit" colorScheme="teal" mb={8}>
            Log In
          </Button>

          <Text mb={6}>
            If you not have an account you can <Link to="/register">Register</Link>
          </Text>
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
