import {
	Box,
	Button,
	Card,
	CardBody,
	Divider,
	Flex,
	Heading,
	Stack,
	Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { IList } from '../../../../@types/IList'

import { IAuthors } from '../../../../@types/IAuthors'

import { formatDate, toHoursAndMinutes } from '../../../../helpers'

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks'
import { FetchDeleteCourse } from '../../../../store/courses/asyncActions'

export const CourseCard = ({
	id,
	title,
	description,
	creationDate,
	duration,
	authors,
}: IList) => {
	const dispatch = useAppDispatch()
	const authorsList = useAppSelector(state => state.authors.authorsList)
	const role = useAppSelector(state => state.auth.role)

	const getCourseAuthors = (authors: IAuthors[], courseAuthors: string[]) => {
		if (courseAuthors) {
			return courseAuthors.map((AuthorId, index) => {
				const author = authors.find(author => author.id === AuthorId)
				if (!author) {
					return ''
				}
				if (index === courseAuthors.length - 1) {
					return author.name
				}
				return author.name + ','
			})
		}
	}

	const permissionForButtons = (role: string) => {
		if (role === 'admin') {
			return (
				<>
					<Button onClick={() => dispatch(FetchDeleteCourse(id!))}>
						Delete
					</Button>
					<Button as={Link} to={`course/update/${id}`}>
						Edit
					</Button>
				</>
			)
		}
	}

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
							{getCourseAuthors(authorsList, authors!)}
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
					<Box display='flex' justifyContent={'center'}>
						<Button as={Link} to={`/course/${id}`}>
							Show course
						</Button>
						{permissionForButtons(role!)}
					</Box>
				</CardBody>
			</Flex>
			<Divider />
		</Card>
	)
}
