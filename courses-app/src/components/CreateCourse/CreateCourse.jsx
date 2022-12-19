import {
	FormControl,
	FormLabel,
	Input,
	Text,
	Textarea,
	Flex,
	Container,
	Box,
} from '@chakra-ui/react';

import React from 'react';
import { ButtonMain } from './../../common/Button/Button';
import toHoursAndMinutes from './../../helpers/toHoursAndMinutes';
import { mockedAuthorsList } from '../../constant/constant';
import createId from '../../helpers/createAuthorId';

export const CreateCourse = ({ handleAddCourse, handleOpenModal }) => {
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [authors, setAuthors] = React.useState(mockedAuthorsList);
	const [selectedAuthors, setSelectedAuthors] = React.useState([]);
	const [duration, setDuration] = React.useState(0);
	const [newAuthorName, setNewAuthorName] = React.useState('');

	//function

	const courseDate = new Date().toLocaleDateString();

	let handleTitleChange = (e) => {
		let inputValue = e.target.value;
		setTitle(inputValue);
	};
	let handleDescriptionChange = (e) => {
		let inputValue = e.target.value;
		setDescription(inputValue);
	};

	let handleAuthorsChange = (e) => {
		let inputValue = e.target.value;
		setNewAuthorName(inputValue);
	};

	let handleDurationChange = (e) => {
		let inputValue = e.target.value;
		setDuration(+inputValue);
	};

	const createNewCourse = () => {
		if (!title || !description || !authors || !selectedAuthors || !duration) {
			alert('error');
		} else {
			const courseAuthors =
				selectedAuthors.length > 0
					? selectedAuthors.map((author) => author.id)
					: [];

			const newCourse = {
				id: createId(),
				title,
				description,
				duration,
				authors: courseAuthors,
				creationDate: courseDate,
			};

			handleAddCourse(newCourse);

			handleOpenModal();
		}
	};

	const createAuthor = () => {
		if (!newAuthorName) {
			alert('Pass author name');
		} else {
			const newAuthors = {
				id: createId(),
				name: newAuthorName,
			};
			mockedAuthorsList.push(newAuthors);
			setAuthors([...mockedAuthorsList]);
			setNewAuthorName('');
		}
	};

	const AddAuthors = (id) => {
		const selected = authors.find((author) => author.id === id);
		if (selected == null) {
			return;
		}
		setSelectedAuthors([...selectedAuthors, selected]);
	};

	const RemoveAuthors = (id) => {
		setSelectedAuthors((prev) => prev.filter((author) => author.id !== id));
	};

	const getAddAuthors = (authors) => {
		return authors.map((author) => {
			const isSelected = selectedAuthors.find(
				(selected) => author.id === selected.id
			);
			if (isSelected != null) return <></>;

			return (
				<Box w='100%' key={author.id}>
					<Flex justify='space-around'>
						<Text align='center'>{author.name}</Text>
						<ButtonMain
							onClick={() => AddAuthors(author.id)}
							buttonText='Add'
						></ButtonMain>
					</Flex>
				</Box>
			);
		});
	};

	const hendelSelectedAuthors = (selectedAuthors) => {
		if (selectedAuthors.length === 0) {
			return <Text align='center'>Authors list is empty</Text>;
		}

		return selectedAuthors.map((selectedAuthor) => {
			return (
				<Box w='100%' key={selectedAuthor.id}>
					<Flex justify='space-around'>
						<Text align='center'>{selectedAuthor.name}</Text>
						<ButtonMain
							key={selectedAuthor.id}
							onClick={() => RemoveAuthors(selectedAuthor.id)}
							buttonText='Remove'
						></ButtonMain>
					</Flex>
				</Box>
			);
		});
	};

	const authorsInfo = getAddAuthors(authors);
	const selectedListOfAuthors = hendelSelectedAuthors(selectedAuthors);
	return (
		<Container maxW='1220px'>
			<FormControl>
				<FormLabel>Title</FormLabel>
				<Flex minWidth='max-content' justify={'space-between'}>
					<Input
						onChange={handleTitleChange}
						value={title}
						maxW='30%'
						placeholder='Title'
					/>

					<ButtonMain
						onClick={createNewCourse}
						buttonText='Add Course'
					></ButtonMain>
				</Flex>
			</FormControl>

			<FormControl>
				<FormLabel>Description</FormLabel>
				<Textarea
					value={description}
					onChange={handleDescriptionChange}
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
							onChange={handleAuthorsChange}
							value={newAuthorName}
							placeholder='Author name '
						/>
					</FormControl>
					<ButtonMain
						onClick={createAuthor}
						buttonText='Create Author'
					></ButtonMain>

					<FormControl>
						<FormLabel>Duration</FormLabel>

						<Input onChange={handleDurationChange} placeholder='Duration' />

						<Text>
							Duration:<strong>{toHoursAndMinutes(duration)}</strong>
						</Text>
					</FormControl>
				</Box>
				<Box w='100%'>
					<Text align='center'>Authors</Text>

					{authorsInfo}

					<Text pt='5' align='center'>
						Course Authors
					</Text>
					{selectedListOfAuthors}
				</Box>
			</Flex>
		</Container>
	);
};
