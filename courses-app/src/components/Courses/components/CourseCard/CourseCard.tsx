
import {
	Card,
	CardBody,
	Stack,
	Text,
	Heading,
	Divider,
	Flex,
	Box,
  Button
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { mockedAuthorsList } from '../../../../constant/constant';
import toHoursAndMinutes from '../../../../helpers/toHoursAndMinutes';
import { formatDate } from '../../../../helpers/formatDate';
import { IList } from '../../../../@types/IList';

export const CourseCard = ({
  id,
	title,
	description,
	creationDate,
	duration,
	authors,
}:IList) => {
	const getAuthors = (authorIds: string[]) => {
    return authors?.map((authorId, index) => {
      const author = mockedAuthorsList.find((author) => author.id === authorId);
      if (index === authorIds.length - 1) return author?.name;
      return author?.name + ', ';
    });
  };
	const authorText = getAuthors(authors!);
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
            <Button as={Link} to={`/courses/${id}`}>Show course</Button>
          </Box>
        </CardBody>
      </Flex>
      <Divider />
    </Card>
  );
};