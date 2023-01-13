import React from 'react';
// ui
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  Flex,
  Container,
  Box,
  Button,
} from '@chakra-ui/react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
// helpers
import toHoursAndMinutes from '../../helpers/toHoursAndMinutes';
import createId from '../../helpers/createId';

// types
import { IAuthors } from '../../@types/IAuthors';
// store
import { selectAuthorsData } from '../../store/authors/selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../store/store';

import { FetchAddCourse, FetchCourseByID } from '../../store/courses/asyncActions';
import { FetchAddAuthors } from '../../store/authors/asyncActions';
// CONST

import { ROUTES } from '../../router/_Routes';
import { Authors } from '../../components/Authors/Authors';

type Props = {
  value: 'create' | 'update';
};

export const CourseFrom = ({ value }: Props) => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { authorsList } = useSelector(selectAuthorsData);
  const dispatch = useAppDispatch();

  let a = dispatch(FetchCourseByID(courseId!));
  console.log(a);

  // State
  const [title, setTitle] = React.useState(() => (value === 'update' && courseId ? courseId : ''));
  const [description, setDescription] = React.useState(() =>
    value === 'update' && courseId ? courseId : '',
  );
  const [selectedAuthors, setSelectedAuthors] = React.useState<IAuthors[]>([]);
  const [duration, setDuration] = React.useState<number>(0);
  const [newAuthorName, setNewAuthorName] = React.useState<string>('');

  //function

  let handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue = e.target.value;
    setTitle(inputValue);
  };
  let handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    let inputValue = e.target.value;
    setDescription(inputValue);
  };

  let handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue = e.target.value;
    setNewAuthorName(inputValue);
  };

  let handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue = e.target.value;
    setDuration(+inputValue);
  };

  const generateCourse = (courseDate: string) => {
    const courseAuthors =
      selectedAuthors.length > 0 ? selectedAuthors.map((author) => author.id) : [];

    return {
      title,
      duration,
      description,
      creationDate: courseDate,
      authors: courseAuthors,
    };
  };

  const createNewCourse = async () => {
    if (!title || !description || !selectedAuthors || !duration) {
      alert('Add all fileds');
    }
    const courseDate = new Date().toLocaleDateString();

    const newCourse = generateCourse(courseDate);

    dispatch(FetchAddCourse(newCourse));
    navigate(ROUTES.main);
  };

  const RemoveAuthors = (id: string) => {
    setSelectedAuthors((prev) => prev.filter((author) => author.id !== id));
  };

  const createAuthor = () => {
    if (newAuthorName === '') {
      alert('Pass author name');
    }

    const newAuthor = {
      name: newAuthorName,
    };

    dispatch(FetchAddAuthors(newAuthor));
    setNewAuthorName('');
  };

  const AddAuthors = (id: string) => {
    const selected = authorsList.find((author) => author.id === id);
    const isSelectedChosen = selectedAuthors.find((author) => author.id === id);

    if (selected == null) return;
    if (isSelectedChosen != null) return;

    setSelectedAuthors((prev) => [...prev, selected]);
  };

  const getAddAuthors = (authors: IAuthors[]) => {
    return authors.map((author) => {
      const isSelected = selectedAuthors.find((selected) => author.id === selected.id);
      if (isSelected != null) {
        return;
      }
      return (
        <Authors key={author.id} authors={author} onClick={AddAuthors} buttonText={'Add'}></Authors>
      );
    });
  };

  const hendelSelectedAuthors = (selectedAuthors: IAuthors[]) => {
    if (selectedAuthors.length === 0) {
      return <Text align="center">Authors list is empty</Text>;
    }

    return selectedAuthors.map((selectedAuthor) => {
      return (
        <Authors
          key={selectedAuthor.id}
          authors={selectedAuthor}
          onClick={RemoveAuthors}
          buttonText={'Remove'}></Authors>
      );
    });
  };

  const ChooseButton =
    value === 'create' ? (
      <Button onClick={createNewCourse}>Add Course</Button>
    ) : (
      <Button >Update</Button>
    );

  const authorsInfo = getAddAuthors(authorsList);
  const selectedListOfAuthors = hendelSelectedAuthors(selectedAuthors);
  console.log(selectedAuthors);

  return (
    <Container maxW="1220px">
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Flex minWidth="max-content" justify={'space-between'}>
          <Input onChange={handleTitleChange} value={title} maxW="30%" placeholder="Title" />
          <Button as={NavLink} to="/">
            To Main
          </Button>
          {ChooseButton}
        </Flex>
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
          size="sm"
        />
      </FormControl>
      <Flex mt="5" justify="space-between">
        <Box w="100%">
          <Text align="center">Add author</Text>
          <FormControl>
            <FormLabel> Author name</FormLabel>
            <Input
              onChange={handleAuthorsChange}
              value={newAuthorName}
              placeholder="Author name "
            />
          </FormControl>
          <Button onClick={createAuthor}>Create Author</Button>

          <FormControl>
            <FormLabel>Duration</FormLabel>

            <Input onChange={handleDurationChange} placeholder="Duration" />

            <Text>
              Duration:<strong>{toHoursAndMinutes(duration!)}</strong>
            </Text>
          </FormControl>
        </Box>
        <Box w="100%">
          <Text align="center">Authors</Text>

          {authorsInfo}

          <Text pt="5" align="center">
            Course Authors
          </Text>
          {selectedListOfAuthors}
        </Box>
      </Flex>
    </Container>
  );
};
