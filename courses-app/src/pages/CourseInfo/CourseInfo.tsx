import React from 'react';
import { Card, CardBody, Stack, Text, Heading, Divider, Flex, Button } from '@chakra-ui/react';
import { useParams, NavLink } from 'react-router-dom';

import { formatDate } from '../../helpers/formatDate';
import toHoursAndMinutes from './../../helpers/toHoursAndMinutes';

import { useSelector } from 'react-redux';
import { selectCoursesData } from '../../store/courses/selectors';
import { selectAuthorsData } from '../../store/authors/selectors';

//
import { IAuthors } from '../../@types/IAuthors';

export const CourseInfo: React.FC = () => {
  const { courseId } = useParams();
  const { items } = useSelector(selectCoursesData);
  const { authorsList } = useSelector(selectAuthorsData);

  const courses = items.find((course) => {
    return course.id === courseId;
  });

  const getAuthorsNames = (authorIds: string[], AuthorsList: IAuthors[]) => {
    return authorIds.map((authorsID, index) => {
      const author = AuthorsList.find((author) => author.id === authorsID);

      if (index === authorIds.length - 1) {
        return author?.name;
      }
      return author?.name + ', ';
    });
  };

  const authorText = getAuthorsNames(courses?.authors!, authorsList);

  return (
    <>
      <Card m={'20px'}>
        <Button as={NavLink} to="/">
          Go back
        </Button>
        <Flex>
          <CardBody w={'100%'}>
            <Stack mt="6" spacing="3">
              <Heading size="md">{courses?.title}</Heading>
              <Text>{courses?.description}</Text>
            </Stack>
          </CardBody>
          <CardBody w={'100%'}>
            <Stack mt="6" spacing="3">
              <Text>
                <span> ID:{courses?.id} </span>
              </Text>
              <Text>
                <span> Duration:{toHoursAndMinutes(courses?.duration as number)} </span>
              </Text>
              <Text>
                <span> Created: {formatDate(courses?.creationDate as string)} </span>
              </Text>
              <Text>
                <span> Authors: {authorText}</span>
              </Text>
            </Stack>
          </CardBody>
        </Flex>
        <Divider />
      </Card>
    </>
  );
};
