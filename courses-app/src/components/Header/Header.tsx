import { Box, Flex, Text, Stack, useColorModeValue,Button } from '@chakra-ui/react';
import { Logo } from './components/Logo/Logo';
import { Link } from 'react-router-dom';


export default function Header()  {
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
          <Logo></Logo>
        </Flex>

        <Text color={useColorModeValue('gray.800', 'white')}>Name</Text>
        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
          <Button as={Link} to="/login">
            Login
          </Button>
          <Button as={Link} to="/register">Register</Button>
        </Stack>
      </Flex>
    </Box>
  );
}