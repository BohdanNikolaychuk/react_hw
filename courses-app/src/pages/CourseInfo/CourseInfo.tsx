import {
	Button,
	Card,
	CardBody,
	Divider,
	Flex,
	Heading,
	Stack,
	Text,
} from '@chakra-ui/react'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { selectIdEntity } from '../../store/courses/selectors'

//
import { IAuthors } from '../../@types/IAuthors'

import { formatDate, toHoursAndMinutes } from '../../helpers'

import { useAppSelector } from '../../hooks/redux.hooks'

export const CourseInfo: React.FC = () => {
	const { courseId } = useParams()

	const authorsList = useAppSelector(state => state.authors.authorsList)
	const articleById = useAppSelector(selectIdEntity(courseId!))

	const getAuthorsNames = (authorIds: string[], AuthorsList: IAuthors[]) => {
		return authorIds.map((authorsID, index) => {
			const author = AuthorsList.find(author => author.id === authorsID)

			if (index === authorIds.length - 1) {
				return author?.name
			}
			return author?.name + ', '
		})
	}

	return (
		<>
			<Card m={'20px'}>
				<Button as={NavLink} to='/'>
					Go back
				</Button>
				<Flex>
					<CardBody w={'100%'}>
						<Stack mt='6' spacing='3'>
							<Heading size='md'>{articleById?.title}</Heading>
							<Text>{articleById?.description}</Text>
						</Stack>
					</CardBody>
					<CardBody w={'100%'}>
						<Stack mt='6' spacing='3'>
							<Text>
								<span> ID:{articleById?.id} </span>
							</Text>
							<Text>
								<span>
									Duration:{toHoursAndMinutes(articleById?.duration as number)}
								</span>
							</Text>
							<Text>
								<span>
									Created: {formatDate(articleById?.creationDate as string)}
								</span>
							</Text>
							<Text>
								<span>
									Authors: {getAuthorsNames(articleById?.authors!, authorsList)}
								</span>
							</Text>
						</Stack>
					</CardBody>
				</Flex>
				<Divider />
			</Card>
		</>
	)
}
