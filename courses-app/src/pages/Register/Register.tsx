
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
} from '@chakra-ui/react';

const Register = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex flexDirection="column" bg={formBackground} p={12} borderRadius={8} boxShadow="lg">
        <Heading mb={6}>Register</Heading>
        <Input placeholder="johndoe@gmail.com" type="email" variant="filled" mb={3} />
        <Input placeholder="**********" type="password" variant="filled" mb={6} />
        <Button colorScheme="teal" mb={8}>
         Register
        </Button>
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
