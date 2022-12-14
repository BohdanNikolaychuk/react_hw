import React from 'react';
import {
	Card,
	CardBody,
	Stack,
	Text,
	Heading,
	Divider,
	Flex,
	Box,
} from '@chakra-ui/react';
import { ButtonMain } from '../../../../common/Button/Button';
import { mockedAuthorsList } from '../../../../constant/constant';
export const CourseCard = ({
	title,
	description,
	creationDate,
	duration,
	authors,
}) => {
	const getAuthors = (authorIds) => {
		return authors.map((authorId, index) => {
			const author = mockedAuthorsList.find((author) => author.id === authorId);

			if (index === authorIds.length - 1) return author.name;
			return author.name + ', ';
		});
	};
	const authorText = getAuthors(authors);
	return (
		<Card m={'20px'}>
			<Flex>
				<CardBody w={'100%'}>
					<Stack mt='6' spacing='3'>
						<Heading size='md'>{title}</Heading>
						<Text>{description}</Text>
					</Stack>
				</CardBody>
				<CardBody w={'100%'}>
					<Stack mt='6' spacing='3'>
						<Text>
							<span> Authors: </span>
							{authorText}
						</Text>
						<Text>
							<span> creationDate: </span>
							{duration} hours
						</Text>
						<Text>
							<span> creationDate: </span>
							{creationDate}
						</Text>
					</Stack>
					<Box display='flex' justifyContent={'center'}>
						<ButtonMain
							buttonText='Show course'
							variant='solid'
							colorScheme='blue'
						></ButtonMain>
					</Box>
				</CardBody>
			</Flex>
			<Divider />
		</Card>
	);
};
