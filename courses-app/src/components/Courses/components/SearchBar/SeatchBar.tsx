import React, { FormEvent } from 'react';
import { Flex, Container, Button, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface SearchBar {
  inputHandler: (filter: string) => void;
}

export const SearchBar = ({ inputHandler }: SearchBar) => {
  const [filter, setFilter] = React.useState('');

  const hendlerSetFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filterCourse = (event: FormEvent) => {
    event.preventDefault();
    inputHandler(filter);
  };

  return (
    <Container maxW="2xl">
      <Flex p="10px">
        <form onSubmit={filterCourse}>
          <Flex alignItems="center">
            <Input
              onChange={hendlerSetFilter}
              value={filter}
              m="10px"
              placeholder="Enter course id or name"
            />
            <Button type="submit">Search</Button>
          </Flex>
          <Button as={Link} to="course/create">
            Add new Course
          </Button>
        </form>
      </Flex>
    </Container>
  );
};
