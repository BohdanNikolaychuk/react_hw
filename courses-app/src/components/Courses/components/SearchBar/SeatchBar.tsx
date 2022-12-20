
import { Flex, Spacer, Container,Button,Input } from '@chakra-ui/react';

export const SearchBar = ({ handleOpenModal, inputHandler }:any) => {
  return (
    <Container maxW="2xl">
      <Flex p="10px">
        <Flex>
          <Input onChange={inputHandler} m="10px" placeholder="Enter course id or name"/>
          <Button >Search</Button>
        </Flex>
        <Spacer />
        <Button onClick={handleOpenModal}>
          Add new Course
        </Button>
      </Flex>
    </Container>
  );
};
