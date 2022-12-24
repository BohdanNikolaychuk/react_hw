import { Link } from 'react-router-dom';
import { Flex, Heading, Input, Button, Text } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
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

  async function createUser(data: IFormInputs) {
    try {
      // 👇️ const response: Response
      const response = await axios.post('http://localhost:4000/register', data);

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      // 👇️ const result: CreateUserResponse
      const result = (await response) as IFormInputs;

      console.log('result is: ', JSON.stringify(result, null, 4));

      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  const onSubmit = (data: IFormInputs) => {
    createUser(data);
  };
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" p={12} borderRadius={8} boxShadow="lg">
          <Heading mb={6}>Registration</Heading>

          <Input {...register('name')} placeholder="Name" type="text" variant="filled" mb={6} />
          <div className="invalid-feedback">{errors.name?.message}</div>
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
            variant="filled"
            mb={6}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>

          <Button type="submit" colorScheme="teal" mb={8}>
            Registar
          </Button>

          <Text mb={6}>
            If you have an account you can{' '}
            <Button as={Link} to="/login">
              Login
            </Button>
          </Text>
        </Flex>
      </form>
    </Flex>
  );
};

export default Register;
