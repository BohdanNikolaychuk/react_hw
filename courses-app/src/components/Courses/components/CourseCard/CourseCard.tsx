import React from 'react';

import { Card, CardBody, Stack, Text, Heading, Divider, Flex, Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import toHoursAndMinutes from '../../../../helpers/toHoursAndMinutes';
import { formatDate } from '../../../../helpers/formatDate';
import { IList } from '../../../../@types/IList';
import { useAppDispatch } from '../../../../store/store';
import { useSelector } from 'react-redux';
import { selectAuthorsData } from '../../../../store/authors/selectors';
import { FetchAllAuthors } from '../../../../store/authors/asyncActions';
import { IAuthors } from '../../../../@types/IAuthors';

export const CourseCard = ({ id, title, description, creationDate, duration, authors }: IList) => {
  const dispatch = useAppDispatch();
  const { authorsList, status } = useSelector(selectAuthorsData);

  const getAllAuthors = () => {
    dispatch(FetchAllAuthors());
  };

  React.useEffect(() => {
    getAllAuthors();
  }, []);

  const getCourseAuthors = (authors: IAuthors[], courseAuthors: string[]) => {
    if (courseAuthors) {
      return courseAuthors.map((courseAuthorId, index) => {
        const author = authors.find((author) => author.id === courseAuthorId);

        if (author == null) return '';

        if (index === courseAuthors.length - 1) return author.name;
        return author.name + ', ';
      });
    }
  };

  const authorText = getCourseAuthors(authorsList, authors!);
  const formatDuration = toHoursAndMinutes(duration!);

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
              {formatDuration} hours
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
          </Box>
        </CardBody>
      </Flex>
      <Divider />
    </Card>
  );
};
