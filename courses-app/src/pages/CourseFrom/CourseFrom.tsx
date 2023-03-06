import React from 'react'
// ui
import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Text,
	Textarea
} from '@chakra-ui/react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
// helpers

// types
import { IAuthors } from '../../@types/IAuthors'
// store

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks'
import { FetchAddAuthors } from '../../store/authors/asyncActions'
import {
	FetchAddCourse,
	FetchCourseUpdate
} from '../../store/courses/asyncActions'
// CONST

import { Authors } from '../../components/Authors/Authors'

import { toHoursAndMinutes } from '../../helpers'
import { ROUTES } from '../../router/ROUTES'
import { selectIdEntity } from '../../store/courses/selectors'

type ChooseForm = {
	value: 'create' | 'update'
}

export const CourseFrom = ({ value }: ChooseForm) => {
	const { courseId } = useParams()
	const navigate = useNavigate()

	const authorsList = useAppSelector(state => state.authors.authorsList)
	const dispatch = useAppDispatch()

	const articleById = useAppSelector(selectIdEntity(courseId!))

	// State
	const [title, setTitle] = React.useState(() =>
		value === 'update' && courseId ? articleById?.title : ''
	)
	const [description, setDescription] = React.useState(() =>
		value === 'update' && courseId ? articleById?.description : ''
	)
	const [selectedAuthors, setSelectedAuthors] = React.useState<IAuthors[]>(
		() => {
			if (value === 'update') {
				const courseAuthors = articleById?.authors?.map(id =>
					authorsList.find(author => author.id === id)
				)

				return courseAuthors?.filter(Boolean) as IAuthors[]
			}
			return []
		}
	)
	const [duration, setDuration] = React.useState(() =>
		value === 'update' && courseId ? articleById?.duration : 0
	)
	const [newAuthorName, setNewAuthorName] = React.useState<string>('')

	//function

	let handlerTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		let inputValue = e.target.value
		setTitle(inputValue)
	}
	let handlerDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	): void => {
		let inputValue = e.target.value
		setDescription(inputValue)
	}

	let handlerAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		let inputValue = e.target.value
		setNewAuthorName(inputValue)
	}

	let handlerDurationChange = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		let inputValue = e.target.value
		setDuration(+inputValue)
	}

	const generateCourse = (courseDate: string) => {
		const courseAuthors =
			selectedAuthors.length > 0 ? selectedAuthors.map(author => author.id) : []

		return {
			title,
			duration,
			description,
			creationDate: courseDate,
			authors: courseAuthors,
		}
	}

	const createNewCourse = async () => {
		if (!title || !description || !selectedAuthors || !duration) {
			alert('Add all fields')
		}
		const courseDate = new Date().toLocaleDateString()

		const newCourse = generateCourse(courseDate)

		dispatch(FetchAddCourse(newCourse))
		navigate(ROUTES.main)
	}

	const updateNewCourse = async () => {
		const courseDate = new Date().toLocaleDateString()
		const updateCourse = generateCourse(courseDate)

		dispatch(FetchCourseUpdate({ courseId, updateCourse }))
		navigate(ROUTES.main)
	}

	const RemoveAuthors = (id: string) => {
		setSelectedAuthors(prev => prev.filter(author => author.id !== id))
	}

	const createAuthor = () => {
		if (newAuthorName === '') {
			alert('Pass author name')
		}

		const newAuthor = {
			name: newAuthorName,
		}

		dispatch(FetchAddAuthors(newAuthor))
		setNewAuthorName('')
	}

	const AddAuthors = (id: string) => {
		const selected = authorsList.find(author => author.id === id)
		const isSelectedChosen = selectedAuthors.find(author => author.id === id)

		if (selected == null) return
		if (isSelectedChosen != null) return

		setSelectedAuthors(prev => [...prev, selected])
	}

	const getAddAuthors = (authors: IAuthors[]) => {
		return authors.map(author => {
			const isSelected = selectedAuthors.find(
				selected => author.id === selected.id
			)
			if (isSelected != null) {
				return
			}
			return (
				<Authors
					key={author.id}
					authors={author}
					onClick={AddAuthors}
					buttonText={'Add'}
				></Authors>
			)
		})
	}

	const handlerSelectedAuthors = (selectedAuthors: IAuthors[]) => {
		if (selectedAuthors.length === 0) {
			return <Text align='center'>Authors list is empty</Text>
		}

		return selectedAuthors.map(selectedAuthor => {
			return (
				<Authors
					key={selectedAuthor.id}
					authors={selectedAuthor}
					onClick={RemoveAuthors}
					buttonText={'Remove'}
				></Authors>
			)
		})
	}

	const ChooseButton =
		value === 'create' ? (
			<Button onClick={createNewCourse}>Add Course</Button>
		) : (
			<Button onClick={updateNewCourse}>Update</Button>
		)

	return (
		<Container maxW='1220px'>
			<FormControl>
				<FormLabel>Title</FormLabel>
				<Flex minWidth='max-content' justify={'space-between'}>
					<Input
						onChange={handlerTitleChange}
						value={title}
						maxW='30%'
						placeholder='Title'
					/>
					<Button as={NavLink} to={ROUTES.main}>
						To Main
					</Button>
					{ChooseButton}
				</Flex>
			</FormControl>

			<FormControl>
				<FormLabel>Description</FormLabel>
				<Textarea
					value={description}
					onChange={handlerDescriptionChange}
					placeholder='Description'
					size='sm'
				/>
			</FormControl>
			<Flex mt='5' justify='space-between'>
				<Box w='100%'>
					<Text align='center'>Add author</Text>
					<FormControl>
						<FormLabel> Author name</FormLabel>
						<Input
							onChange={handlerAuthorsChange}
							value={newAuthorName}
							placeholder='Author name '
						/>
					</FormControl>
					<Button onClick={createAuthor}>Create Author</Button>

					<FormControl>
						<FormLabel>Duration</FormLabel>

						<Input
							value={duration}
							onChange={handlerDurationChange}
							placeholder='Duration'
						/>

						<Text>
							Duration:<strong>{toHoursAndMinutes(duration!)}</strong>
						</Text>
					</FormControl>
				</Box>
				<Box w='100%'>
					<Text align='center'>Authors</Text>

					{getAddAuthors(authorsList)}

					<Text pt='5' align='center'>
						Course Authors
					</Text>
					{handlerSelectedAuthors(selectedAuthors)}
				</Box>
			</Flex>
		</Container>
	)
}
