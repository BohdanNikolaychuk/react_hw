import React from 'react';

import { Card, CardBody, Stack, Text, Heading, Divider, Flex, Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import toHoursAndMinutes from '../../../../helpers/toHoursAndMinutes';
import { formatDate } from '../../../../helpers/formatDate';
import { IList } from '../../../../@types/IList';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

import { selectAuthorsData } from '../../../../store/authors/selectors';

import { IAuthors } from '../../../../@types/IAuthors';

import { selectAuthData } from '../../../../store/user/selectors';
import { FetchDeleteCourse } from '../../../../store/courses/asyncActions';
export const CourseCard = ({ id, title, description, creationDate, duration, authors }: IList) => {
  const dispatch = useAppDispatch();
  const { authorsList } = useAppSelector(selectAuthorsData);
  const { role } = useAppSelector(selectAuthData);

  const getCourseAuthors = (authors: IAuthors[], courseAuthors: string[]) => {
    if (courseAuthors) {
      return courseAuthors.map((AuthorId, index) => {
        const author = authors.find((author) => author.id === AuthorId);

        if (!author) {
          return '';
        }

        if (index === courseAuthors.length - 1) {
          return author.name;
        }
        return author.name + ',';
      });
    }
  };

  const PermitionForButtons = (role: string) => {
    if (role === 'admin') {
      return (
        <>
          <Button onClick={() => dispatch(FetchDeleteCourse(id!))}>Delete</Button>
          <Button as={Link} to={`course/update/${id}`}>
            Edit
          </Button>
        </>
      );
    }
  };

  const authorText = getCourseAuthors(authorsList, authors!);
  const perminitionForButttons = PermitionForButtons(role!);
  return (
    <Card m={'20px'}>
      <Flex>
        <CardBody w={'100%'}>
          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Text>{description}</Text>
          </Stack>
        </CardBody>
        <CardBody w={'100%'}>
          <Stack mt="6" spacing="3">
            <Text>
              <span> Authors: </span>
              {authorText}
            </Text>
            <Text>
              <span> creationDate: </span>
              {toHoursAndMinutes(duration!)} hours
            </Text>
            <Text>
              <span> creationDate: </span>
              {formatDate(creationDate!)}
            </Text>
          </Stack>
          <Box display="flex" justifyContent={'center'}>
            <Button as={Link} to={`/course/${id}`}>
              Show course
            </Button>
            {perminitionForButttons}
          </Box>
        </CardBody>
      </Flex>
      <Divider />
    </Card>
  );
};
