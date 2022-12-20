
import React from 'react';
import { Card, CardBody, Stack, Text, Heading, Divider, Flex, Box } from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { mockedCoursesList, mockedAuthorsList } from '../../constant/constant';
import { formatDate } from '../../helpers/formatDate';
import toHoursAndMinutes from './../../helpers/toHoursAndMinutes';
const CourseInfo = () => {
  const { courseId } = useParams();


  const courses  = mockedCoursesList.find((course) => {
    return course.id === courseId;
  });

  const getAuthors = (authorIds: string[]) => {
    return courses?.authors?.map((authorId, index) => {
      const author = mockedAuthorsList.find((author) => author.id === authorId);
      if (index === authorIds.length - 1) return author?.name;
      return author?.name + ', ';
    });
  };

  const authorText = getAuthors(courses?.authors!);

  return (
    <>
      <Card m={'20px'}>
        <Link to="/courses">Go back</Link>
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

export default CourseInfo;
