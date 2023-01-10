import React, { FormEvent } from 'react';
import { Flex, Container, Button, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAppSelector } from './../../../../store/store';
import { selectAuthData } from '../../../../store/user/selectors';

interface SearchBar {
  inputHandler: (filter: string) => void;
}

export const SearchBar = ({ inputHandler }: SearchBar) => {
  const [filter, setFilter] = React.useState('');
  const { role } = useAppSelector(selectAuthData);
  const hendlerSetFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filterCourse = (event: FormEvent) => {
    event.preventDefault();
    inputHandler(filter);
  };

  const PerminitionForSearch = (role: string) => {
    if (role === 'admin') {
      return (
        <Button as={Link} to="course/create">
          Add new Course
        </Button>
      );
    }
  };

  const perminitionForSearch = PerminitionForSearch(role);

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
          {perminitionForSearch}
        </form>
      </Flex>
    </Container>
  );
};
