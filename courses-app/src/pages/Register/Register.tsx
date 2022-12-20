import { Link } from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  Text
} from '@chakra-ui/react';

const Register = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex flexDirection="column" bg={formBackground} p={12} borderRadius={8} boxShadow="lg">
        <Heading mb={6}>Registration</Heading>
        <Input placeholder="Name" type="text" variant="filled" mb={6} />
        <Input placeholder="johndoe@gmail.com" type="email" variant="filled" mb={3} />

        <Input placeholder="**********" type="password" variant="filled" mb={6} />
        <Button colorScheme="teal" mb={8}>
          Registar
        </Button>

        <Text mb={6}>
          If you have an account you can <Link to="/login">Login</Link>
        </Text>

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Enable Dark Mode?
          </FormLabel>
          <Switch id="dark_mode" colorScheme="teal" size="lg" onChange={toggleColorMode} />
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Register;
